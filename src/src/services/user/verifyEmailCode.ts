import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifyEmailCodeArguments {
	baseUrl: string;
	did: string;
	validationCode: string;
}

async function doVerifyEmailCode(args: VerifyEmailCodeArguments) {
	return commonUserRequest(
		`${args.baseUrl}/verifyMailCode`,
		{ validationCode: args.validationCode, did: args.did },
		singleCertificateCodec
	);
}

const verifyEmailCodeComponent = buildComponentServiceCall(doVerifyEmailCode);

export function verifyEmailCode(serviceKey: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, didData => {
			return verifyEmailCodeComponent(serviceKey, { baseUrl, did: didData.did, validationCode }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
