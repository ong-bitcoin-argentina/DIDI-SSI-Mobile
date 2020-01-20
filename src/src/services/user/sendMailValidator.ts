import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface SendMailValidatorArguments {
	api: DidiServerApiClient;
	email: string;
	idCheck?: {
		did: EthrDID;
		password: string;
	};
}

const sendMailValidatorComponent = buildComponentServiceCall(async (args: SendMailValidatorArguments) =>
	convertError(await args.api.sendMailValidator(args.email, args.idCheck))
);

export function sendMailValidator(serviceKey: string, email: string, password: string | null) {
	return withDidiServerClient(serviceKey, {}, api => {
		if (password === null) {
			return sendMailValidatorComponent(serviceKey, { api, email }, () => {
				return serviceCallSuccess(serviceKey);
			});
		} else {
			return withExistingDid(serviceKey, {}, did => {
				return sendMailValidatorComponent(serviceKey, { api, email, idCheck: { did, password } }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		}
	});
}
