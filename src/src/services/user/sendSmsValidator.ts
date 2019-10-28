import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { RequestDocument } from "../../model/RequestDocument";
import { Claim } from "../../uPort/types/Claim";

export interface SendSmsValidatorArguments {
	request: RequestDocument;
	own: Claim;
	verified: string[];
}

async function sendSmsValidator(args: SendSmsValidatorArguments): Promise<void> {
	return Promise.resolve();
}

export type SendSmsValidatorAction = ServiceAction<"SEND_SMS_VALIDATOR", SendSmsValidatorArguments, void, string>;

export type SendSmsValidatorState = ServiceStateOf<SendSmsValidatorAction>;

export const sendSmsValidatorReducer = serviceReducer(
	sendSmsValidator,
	(act): act is SendSmsValidatorAction => act.type === "SEND_SMS_VALIDATOR"
);
