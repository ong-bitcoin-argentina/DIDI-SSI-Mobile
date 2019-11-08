import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface ChangePasswordArguments {
	baseUrl: string;
	did: string;
	oldPassword: string;
	newPassword: string;
}

async function doChangePassword(args: ChangePasswordArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changePassword`,
		{ oldPass: args.oldPassword, newPass: args.newPassword, did: args.did },
		emptyDataCodec
	);
}

const changePasswordComponent = buildComponentServiceCall(doChangePassword);

export function changePassword(serviceKey: string, oldPassword: string, newPassword: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, didData => {
			return changePasswordComponent(serviceKey, { baseUrl, oldPassword, newPassword, did: didData.did }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
