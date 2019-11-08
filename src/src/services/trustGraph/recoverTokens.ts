import { isRight, left, right } from "fp-ts/lib/Either";

import TypedArray from "../../util/TypedArray";
import {
	buildComponentServiceCall,
	serviceCallDrop,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { serviceErrors } from "../common/serviceErrors";

import { StoreAction } from "../../store/StoreAction";
import parseJWT from "../../uPort/parseJWT";
import { TrustGraphClient } from "../../uPort/TrustGraphClient";
import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";
import { ServiceCallAction } from "../ServiceStateStore";

interface RecoverTokensArguments {
	trustGraphUri: string;
	ethrDidUri: string;
}

async function doRecoverTokens(args: RecoverTokensArguments) {
	try {
		const tg = await TrustGraphClient.create(args.trustGraphUri);
		const tokens = await tg.getJWTs();

		const acceptToken = async (token: string): Promise<string | undefined> => {
			if (isRight(await parseJWT(token, args.ethrDidUri))) {
				return token;
			} else {
				return undefined;
			}
		};

		const verifiedTokens = TypedArray.flatMap(await Promise.all(tokens.reverse().map(acceptToken)), x => x);
		return right(verifiedTokens);
	} catch (e) {
		return left(serviceErrors.trustGraph.FETCH_ERR);
	}
}

const recoverTokensComponent = buildComponentServiceCall(doRecoverTokens);

export function recoverTokens() {
	const serviceKey = "_recoverTokens";
	return getState(serviceKey, {}, store => {
		const { trustGraphUri, ethrDidUri } = store.serviceSettings;
		// TODO: Combine this and part of TrustGraphClient creation into getSigner
		return ensureDid(serviceKey, {}, didData => {
			return recoverTokensComponent(serviceKey, { trustGraphUri, ethrDidUri }, tokens => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: tokens }, () => {
					return serviceCallDrop(serviceKey);
				});
			});
		});
	});
}
