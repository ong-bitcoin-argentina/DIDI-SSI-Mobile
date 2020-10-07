import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
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
		name?: string;
		lastname?: string;
	};
	firebaseId: string | undefined;
}

const registerUserComponent = buildComponentServiceCall(async (args: RegisterUserArguments) =>
	convertError(await args.api.registerUser(args.did, PRIVATE_KEY_SEED_PASSWORD, args.data, args.firebaseId))
);

export function registerUser(
	serviceKey: string,
	email: string,
	password: string,
	phoneNumber: string,
	name?: string,
	lastname?: string
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
