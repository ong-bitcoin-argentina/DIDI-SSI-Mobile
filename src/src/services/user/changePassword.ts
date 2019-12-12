import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface ChangePasswordArguments {
	baseUrl: string;
	did: EthrDID;
	oldPassword: string;
	newPassword: string;
}

async function doChangePassword(args: ChangePasswordArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changePassword`,
		{ oldPass: args.oldPassword, newPass: args.newPassword, did: args.did.did() },
		emptyDataCodec
	);
}

const changePasswordComponent = buildComponentServiceCall(doChangePassword);

export function changePassword(serviceKey: string, oldPassword: string, newPassword: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return changePasswordComponent(serviceKey, { baseUrl, oldPassword, newPassword, did }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
