import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface SendSmsValidatorArguments {
	api: DidiServerApiClient;
	cellPhoneNumber: string;
	idCheck?: {
		did: EthrDID;
		password: string;
	};
}

const sendSmsValidatorComponent = buildComponentServiceCall(async (args: SendSmsValidatorArguments) => {
	return convertError(await args.api.sendSmsValidator(args.cellPhoneNumber, args.idCheck));
});

export function sendSmsValidator(serviceKey: string, cellPhoneNumber: string, password: string | null) {
	return withDidiServerClient(serviceKey, {}, api => {
		if (password === null) {
			return sendSmsValidatorComponent(serviceKey, { api, cellPhoneNumber }, (data) => {
				return simpleAction(serviceKey, { type: "SET_CURRENT_VALID_CODE", value: data.code }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		} else {
			return withExistingDid(serviceKey, {}, did => {
				return sendSmsValidatorComponent(serviceKey, { api, cellPhoneNumber, idCheck: { did, password } }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		}
	});
}
