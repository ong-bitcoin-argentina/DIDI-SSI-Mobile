import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangeEmailArguments {
	baseUrl: string;
	did: string;
	validationCode: string;
	newEmail: string;
}

async function doChangeEmail(args: ChangeEmailArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changeEmail`,
		{ eMailValidationCode: args.validationCode, did: args.did, newEMail: args.newEmail },
		singleCertificateCodec
	);
}

const changeEmailComponent = buildComponentServiceCall(doChangeEmail);

export function changeEmail(serviceKey: string, newEmail: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, didData => {
			return changeEmailComponent(serviceKey, { baseUrl, did: didData.did, validationCode, newEmail }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
