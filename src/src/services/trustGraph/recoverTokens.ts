import { parseJWT, TrustGraphClient } from "didi-sdk";
import { isRight, left, right } from "fp-ts/lib/Either";

import TypedArray from "../../util/TypedArray";
import { buildComponentServiceCall, serviceCallDrop, simpleAction } from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getCredentials } from "../../uPort/getCredentials";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

interface RecoverTokensArguments {
	trustGraphUri: string;
	ethrDidUri: string;
}

async function doRecoverTokens(args: RecoverTokensArguments) {
	try {
		const credentials = await getCredentials();
		const tg = new TrustGraphClient({ trustGraphUri: args.trustGraphUri, credentials });
		const tokens = (await tg.getJWTs()).map(data => data.jwt);

		const acceptToken = async (token: string): Promise<string | undefined> => {
			if (isRight(await parseJWT(token, args.ethrDidUri))) {
				return token;
			} else {
				return undefined;
			}
		};

		const verifiedTokens = TypedArray.flatMap(await Promise.all(tokens.map(acceptToken)), x => x);
		return right(verifiedTokens);
	} catch (e) {
		return left(serviceErrors.trustGraph.FETCH_ERR);
	}
}

const recoverTokensComponent = buildComponentServiceCall(doRecoverTokens);

export const recoverTokensServiceKey = "_recoverTokens";

export function recoverTokens() {
	const serviceKey = recoverTokensServiceKey;
	return getState(serviceKey, {}, store => {
		const { trustGraphUri, ethrDidUri } = store.serviceSettings;
		// TODO: Combine this and part of TrustGraphClient creation into getSigner
		return withExistingDid(serviceKey, {}, didData => {
			return recoverTokensComponent(serviceKey, { trustGraphUri, ethrDidUri }, tokens => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: tokens }, () => {
					return serviceCallDrop(serviceKey);
				});
			});
		});
	});
}
