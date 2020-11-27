import { parseJWT, TrustGraphClient } from "didi-sdk";
import { isRight, left, right } from "fp-ts/lib/Either";

import TypedArray from "../../util/TypedArray";
import {
	buildComponentServiceCall,
	parallelAction,
	serviceCallDrop,
	simpleAction
} from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { ActiveDid } from "../../store/reducers/didReducer";
import { getCredentials } from "../../uPort/getCredentials";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";
import { ServiceCallAction } from "../ServiceStateStore";
import { getAllIssuerNames } from "../user/getIssuerNames";
import { AppConfig } from "../../AppConfig";

interface RecoverTokensArguments {
	activeDid: ActiveDid;
	trustGraphUri: string;
	ethrDidUri: string;
	ethrDelegateUri: string;
}

async function doRecoverTokens(args: RecoverTokensArguments) {
	try {
		const credentials = await getCredentials();
		const tg = new TrustGraphClient({ trustGraphUri: args.trustGraphUri, credentials });
		const tokens = (await tg.getJWTs()).map(data => data.jwt);

		const acceptToken = async (token: string): Promise<string | undefined> => {
			const parsed = await parseJWT(token, {
				identityResolver: {
					ethrUri: args.ethrDidUri
				},
				delegation: {
					ethrUri: args.ethrDelegateUri
				},
				providerConfig: AppConfig.defaultServiceSettings.providerConfig,
				audience: args.activeDid ?? undefined
			});
			return isRight(parsed) ? token : undefined;
		};

		const verifiedTokens = TypedArray.flatMap(await Promise.all(tokens.map(acceptToken)), x => x);
		return right(verifiedTokens);
	} catch (e) {
		return left(serviceErrors.trustGraph.FETCH_ERR);
	}
}

const recoverTokensComponent = buildComponentServiceCall(doRecoverTokens);

export const recoverTokensServiceKey = "_recoverTokens";

export function recoverTokens(then?: (tokens: string[]) => ServiceCallAction) {
	const serviceKey = recoverTokensServiceKey;
	return getState(serviceKey, {}, store => {
		const { trustGraphUri, ethrDidUri, ethrDelegateUri } = store.serviceSettings;
		const activeDid = store.did.activeDid;
		// TODO: Combine this and part of TrustGraphClient creation into getSigner
		return withExistingDid(serviceKey, {}, didData => {
			return recoverTokensComponent(serviceKey, { activeDid, trustGraphUri, ethrDidUri, ethrDelegateUri }, tokens => {
				return simpleAction(serviceKey, { type: "TOKEN_SYNC", content: tokens }, () => {
					return parallelAction(serviceKey, [
						getAllIssuerNames(),
						serviceCallDrop(serviceKey),
						...(then ? [then(tokens)] : [])
					]);
				});
			});
		});
	});
}
