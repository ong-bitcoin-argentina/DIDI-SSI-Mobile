import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface UserLoginArguments {
	baseUrl: string;
	did: EthrDID;
	email: string;
	password: string;
}

async function doUserLogin(args: UserLoginArguments) {
	return commonUserRequest(
		`${args.baseUrl}/userLogin`,
		{ eMail: args.email, password: args.password, did: args.did.did() },
		emptyDataCodec
	);
}

const userLoginComponent = buildComponentServiceCall(doUserLogin);

export function userLogin(serviceKey: string, email: string, password: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, did => {
			return userLoginComponent(serviceKey, { baseUrl, did, email, password }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
