import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
import { getPrivateKeySeed } from "../internal/getPrivateKeySeed";
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
	};
}

const registerUserComponent = buildComponentServiceCall(async (args: RegisterUserArguments) =>
	convertError(await args.api.registerUser(args.did, PRIVATE_KEY_SEED_PASSWORD, args.data))
);

export function registerUser(serviceKey: string, email: string, password: string, phoneNumber: string) {
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
						privateKeySeed
					}
				};
				return registerUserComponent(serviceKey, args, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
