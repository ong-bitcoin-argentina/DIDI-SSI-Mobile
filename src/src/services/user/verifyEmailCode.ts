import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifyEmailCodeArguments {
	baseUrl: string;
	did: EthrDID;
	validationCode: string;
}

async function doVerifyEmailCode(args: VerifyEmailCodeArguments) {
	return commonUserRequest(
		`${args.baseUrl}/verifyMailCode`,
		{ validationCode: args.validationCode, did: args.did.did() },
		singleCertificateCodec
	);
}

const verifyEmailCodeComponent = buildComponentServiceCall(doVerifyEmailCode);

export function verifyEmailCode(serviceKey: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, did => {
			return verifyEmailCodeComponent(serviceKey, { baseUrl, did, validationCode }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
