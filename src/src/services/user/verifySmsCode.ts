import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifySmsCodeArguments {
	baseUrl: string;
	did: EthrDID;
	phoneNumber: string;
	validationCode: string;
}

async function doVerifySmsCode(args: VerifySmsCodeArguments) {
	return commonUserRequest(
		"POST",
		`${args.baseUrl}/verifySmsCode`,
		{
			validationCode: args.validationCode,
			cellPhoneNumber: args.phoneNumber,
			did: args.did.did()
		},
		singleCertificateCodec
	);
}

const verifySmsCodeComponent = buildComponentServiceCall(doVerifySmsCode);

export function verifySmsCode(serviceKey: string, phoneNumber: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return verifySmsCodeComponent(serviceKey, { baseUrl, did, phoneNumber, validationCode }, certData => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
