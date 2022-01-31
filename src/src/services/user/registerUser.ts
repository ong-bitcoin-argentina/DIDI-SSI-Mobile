import { DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getPrivateKeySeed } from "../internal/getPrivateKeySeed";
import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface RegisterUserArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	data: {
		email: string;
		phoneNumber: string;
		password: string;
		privateKeySeed: string;
		name: string;
		lastname: string;
	};
	firebaseId: string | undefined;
}

const registerUserComponent  = buildComponentServiceCall(async (args: RegisterUserArguments) => {
	return convertError(await args.api.registerUser(args.did, args.data, args.firebaseId));
}
);

export function registerUser(
	serviceKey: string,
	email: string,
	password: string,
	phoneNumber: string,
	name = '',
	lastname = ''
) {
	return getState(serviceKey, {}, store => {
		const firebaseId = store.pushToken.token ?? undefined;
		return withDidiServerClient(serviceKey, {}, api => {
			return withExistingDid(serviceKey, {}, did => {
				return getPrivateKeySeed(serviceKey, { did }, privateKeySeed => {
					const args: RegisterUserArguments = {
						api,
						did,
						data: {
							email,
							phoneNumber,
							password,
							privateKeySeed,
							name,
							lastname
						},
						firebaseId
					};
					return registerUserComponent(serviceKey, args, () => {
						return serviceCallSuccess(serviceKey);
					});
				});
			});
		});
	});
}
