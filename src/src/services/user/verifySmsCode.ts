import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifySmsCodeArguments {
	baseUrl: string;
	did: EthrDID;
	validationCode: string;
}

async function doVerifySmsCode(args: VerifySmsCodeArguments) {
	return commonUserRequest(
		`${args.baseUrl}/verifySmsCode`,
		{ validationCode: args.validationCode, did: args.did.did() },
		singleCertificateCodec
	);
}

const verifySmsCodeComponent = buildComponentServiceCall(doVerifySmsCode);

export function verifySmsCode(serviceKey: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, did => {
			return verifySmsCodeComponent(serviceKey, { baseUrl, did, validationCode }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
