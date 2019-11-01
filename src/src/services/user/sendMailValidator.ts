import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendMailValidatorArguments {
	email: string;
	did: string;
}

async function sendMailValidator(baseUrl: string, args: SendMailValidatorArguments) {
	return commonUserRequest(`${baseUrl}/sendMailValidator`, { eMail: args.email, did: args.did }, emptyDataCodec);
}

export type SendMailValidatorAction = ServiceAction<
	"SERVICE_SEND_EMAIL_VALIDATOR",
	SendMailValidatorArguments,
	{},
	ErrorData
>;

export type SendMailValidatorState = ServiceStateOf<SendMailValidatorAction>;

export const sendMailValidatorReducer = serviceReducer(
	config => (args: SendMailValidatorArguments) => sendMailValidator(config.didiUserServer, args),
	(act): act is SendMailValidatorAction => act.type === "SERVICE_SEND_EMAIL_VALIDATOR"
);
