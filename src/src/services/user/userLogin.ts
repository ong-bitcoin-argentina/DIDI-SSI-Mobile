import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface UserLoginArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	email: string;
	password: string;
	firebaseId: string | undefined;
}

const userLoginComponent = buildComponentServiceCall(async (args: UserLoginArguments) =>
	convertError(await args.api.userLogin(args.did, args.email, args.password, args.firebaseId))
);

export function userLogin(serviceKey: string, email: string, password: string) {
	return getState(serviceKey, {}, state => {
		const firebaseId = state.pushToken.token ?? undefined;
		return withDidiServerClient(serviceKey, {}, api => {
			return withExistingDid(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, did => {
				return userLoginComponent(serviceKey, { api, did, email, password, firebaseId }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
