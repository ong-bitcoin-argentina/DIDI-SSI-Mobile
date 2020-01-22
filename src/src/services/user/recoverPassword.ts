import { DidiServerApiClient } from "didi-sdk";

import { buildComponentServiceCall } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";

import { recoverAccount } from "./recoverAccount";

export interface RecoverPasswordArguments {
	api: DidiServerApiClient;
	email: string;
	validationCode: string;
	newPassword: string;
}

const recoverPasswordComponent = buildComponentServiceCall(async (args: RecoverPasswordArguments) =>
	convertError(await args.api.recoverPassword(args.email, args.validationCode, args.newPassword))
);

export function recoverPassword(serviceKey: string, email: string, validationCode: string, newPassword: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return recoverPasswordComponent(serviceKey, { api, email, validationCode, newPassword }, () => {
			return recoverAccount(serviceKey, email, newPassword);
		});
	});
}
