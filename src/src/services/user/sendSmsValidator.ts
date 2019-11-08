import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	baseUrl: string;
	did: string;
	cellPhoneNumber: string;
	password: string | null;
}

async function doSendSmsValidator(args: SendSmsValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendSmsValidator`,
		{
			cellPhoneNumber: args.cellPhoneNumber,
			did: args.did,
			...(args.password ? { password: args.password } : {})
		},
		emptyDataCodec
	);
}

const sendSmsValidatorComponent = buildComponentServiceCall(doSendSmsValidator);

export function sendSmsValidator(serviceKey: string, cellPhoneNumber: string, password: string | null) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, didData => {
			return sendSmsValidatorComponent(serviceKey, { baseUrl, did: didData.did, cellPhoneNumber, password }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
