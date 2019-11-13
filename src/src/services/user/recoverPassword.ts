import { buildComponentServiceCall } from "../common/componentServiceCall";

import { getState } from "../internal/getState";

import { recoverAccount } from "./recoverAccount";
import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface RecoverPasswordArguments {
	baseUrl: string;
	email: string;
	validationCode: string;
	newPassword: string;
}

async function doRecoverPassword(args: RecoverPasswordArguments) {
	return commonUserRequest(
		`${args.baseUrl}/recoverPassword`,
		{ eMail: args.email, eMailValidationCode: args.validationCode, newPass: args.newPassword },
		emptyDataCodec
	);
}

const recoverPasswordComponent = buildComponentServiceCall(doRecoverPassword);

export function recoverPassword(serviceKey: string, email: string, validationCode: string, newPassword: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return recoverPasswordComponent(serviceKey, { baseUrl, email, validationCode, newPassword }, () => {
			return recoverAccount(serviceKey, email, newPassword);
		});
	});
}
