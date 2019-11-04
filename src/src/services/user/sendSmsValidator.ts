import { isLeft } from "fp-ts/lib/Either";

import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { ensureDid } from "../internal/ensureDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	cellPhoneNumber: string;
}

async function sendSmsValidator(baseUrl: string, args: SendSmsValidatorArguments) {
	const didData = await ensureDid();
	if (isLeft(didData)) {
		return didData;
	}
	return commonUserRequest(
		`${baseUrl}/sendSmsValidator`,
		{ cellPhoneNumber: args.cellPhoneNumber, did: didData.right.did },
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
