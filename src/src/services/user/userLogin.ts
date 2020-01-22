import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface UserLoginArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	email: string;
	password: string;
}

const userLoginComponent = buildComponentServiceCall(async (args: UserLoginArguments) =>
	convertError(await args.api.userLogin(args.did, args.email, args.password))
);

export function userLogin(serviceKey: string, email: string, password: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, did => {
			return userLoginComponent(serviceKey, { api, did, email, password }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
