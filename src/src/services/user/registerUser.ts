import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getPrivateKeySeed } from "../internal/getPrivateKeySeed";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface RegisterUserArguments {
	baseUrl: string;
	did: EthrDID;
	privateKeySeed: string;
	email: string;
	password: string;
	phoneNumber: string;
}

async function doRegisterUser(args: RegisterUserArguments) {
	return commonUserRequest(
		"POST",
		`${args.baseUrl}/registerUser`,
		{
			eMail: args.email,
			password: args.password,
			phoneNumber: args.phoneNumber,
			did: args.did.did(),
			privateKeySeed: args.privateKeySeed
		},
		emptyDataCodec
	);
}

const registerUserComponent = buildComponentServiceCall(doRegisterUser);

export function registerUser(serviceKey: string, email: string, password: string, phoneNumber: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return getPrivateKeySeed(serviceKey, { did }, privateKeySeed => {
				const args: RegisterUserArguments = {
					baseUrl,
					did,
					privateKeySeed,
					email,
					password,
					phoneNumber
				};
				return registerUserComponent(serviceKey, args, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
