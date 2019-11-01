import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	cellPhoneNumber: string;
	did: string;
}

async function sendSmsValidator(baseUrl: string, args: SendSmsValidatorArguments) {
	return commonUserRequest(
		`${baseUrl}/sendSmsValidator`,
		{ cellPhoneNumber: args.cellPhoneNumber, did: args.did },
		emptyDataCodec
	);
}

export type SendSmsValidatorAction = ServiceAction<
	"SERVICE_SEND_SMS_VALIDATOR",
	SendSmsValidatorArguments,
	{},
	ErrorData
>;

export type SendSmsValidatorState = ServiceStateOf<SendSmsValidatorAction>;

export const sendSmsValidatorReducer = serviceReducer(
	config => (args: SendSmsValidatorArguments) => sendSmsValidator(config.didiUserServer, args),
	(act): act is SendSmsValidatorAction => act.type === "SERVICE_SEND_SMS_VALIDATOR"
);
