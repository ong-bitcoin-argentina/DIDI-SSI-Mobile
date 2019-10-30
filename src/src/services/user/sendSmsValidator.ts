import { isLeft } from "fp-ts/lib/Either";

import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { emptyData, userServiceRequest } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	cellPhoneNumber: string;
	did: string;
}

async function sendSmsValidator(baseUrl: string, args: SendSmsValidatorArguments) {
	return userServiceRequest(
		`${baseUrl}/sendSmsValidator`,
		{ cellPhoneNumber: args.cellPhoneNumber, did: args.did },
		emptyData
	);
}

export type SendSmsValidatorAction = ServiceAction<"SERVICE_SEND_SMS_VALIDATOR", SendSmsValidatorArguments, {}, string>;

export type SendSmsValidatorState = ServiceStateOf<SendSmsValidatorAction>;

export const sendSmsValidatorReducer = serviceReducer(
	config => (args: SendSmsValidatorArguments) => sendSmsValidator(config.didiUserServer, args),
	(act): act is SendSmsValidatorAction => act.type === "SERVICE_SEND_SMS_VALIDATOR"
);
