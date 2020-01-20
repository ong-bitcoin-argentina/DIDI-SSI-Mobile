import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface ChangeEmailArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	validationCode: string;
	newEmail: string;
	password: string;
}

const changeEmailComponent = buildComponentServiceCall(async (args: ChangeEmailArguments) =>
	convertError(await args.api.changeEmail(args.did, args.validationCode, args.newEmail, args.password))
);

export function changeEmail(serviceKey: string, password: string, newEmail: string, validationCode: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, {}, did => {
			return changeEmailComponent(serviceKey, { api, did, validationCode, newEmail, password }, certData => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
