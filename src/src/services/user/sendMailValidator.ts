import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { emptyData, userServiceRequest } from "./userServiceCommon";

export interface SendMailValidatorArguments {
	email: string;
	did: string;
}

async function sendMailValidator(baseUrl: string, args: SendMailValidatorArguments) {
	return userServiceRequest(`${baseUrl}/sendMailValidator`, { eMail: args.email, did: args.did }, emptyData);
}

export type SendMailValidatorAction = ServiceAction<
	"SERVICE_SEND_EMAIL_VALIDATOR",
	SendMailValidatorArguments,
	{},
	string
>;

export type SendMailValidatorState = ServiceStateOf<SendMailValidatorAction>;

export const sendMailValidatorReducer = serviceReducer(
	config => (args: SendMailValidatorArguments) => sendMailValidator(config.didiUserServer, args),
	(act): act is SendMailValidatorAction => act.type === "SERVICE_SEND_EMAIL_VALIDATOR"
);
