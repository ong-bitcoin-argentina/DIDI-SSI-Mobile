import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangeEmailArguments {
	baseUrl: string;
	did: EthrDID;
	validationCode: string;
	newEmail: string;
	password: string;
}

async function doChangeEmail(args: ChangeEmailArguments) {
	return commonUserRequest(
		"POST",
		`${args.baseUrl}/changeEmail`,
		{
			did: args.did.did(),
			eMailValidationCode: args.validationCode,
			newEMail: args.newEmail,
			password: args.password
		},
		singleCertificateCodec
	);
}

const changeEmailComponent = buildComponentServiceCall(doChangeEmail);

export function changeEmail(serviceKey: string, password: string, newEmail: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return changeEmailComponent(serviceKey, { baseUrl, did, validationCode, newEmail, password }, certData => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
