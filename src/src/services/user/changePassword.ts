import { DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface ChangePasswordArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	oldPassword: string;
	newPassword: string;
}

const changePasswordComponent = buildComponentServiceCall(async (args: ChangePasswordArguments) =>
	convertError(await args.api.changePassword(args.did, args.oldPassword, args.newPassword))
);

export function changePassword(serviceKey: string, oldPassword: string, newPassword: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, {}, did => {
			return changePasswordComponent(serviceKey, { api, oldPassword, newPassword, did }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
