import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface SendMailValidatorArguments {
	api: DidiServerApiClient;
	email: string;
	unique: boolean;
	idCheck?: {
		did: EthrDID;
		password: string;
	};
}

const sendMailValidatorComponent = buildComponentServiceCall(async (args: SendMailValidatorArguments) =>
	convertError(await args.api.sendMailValidator(args.email, args.idCheck, args.unique))
);

export function sendMailValidator(serviceKey: string, email: string, password: string | null, unique: boolean = false) {
	return withDidiServerClient(serviceKey, {}, api => {
		if (password === null) {
			return sendMailValidatorComponent(serviceKey, { api, email, unique }, () => {
				return serviceCallSuccess(serviceKey);
			});
		} else {
			return withExistingDid(serviceKey, {}, did => {
				return sendMailValidatorComponent(serviceKey, { api, email, idCheck: { did, password }, unique }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		}
	});
}
