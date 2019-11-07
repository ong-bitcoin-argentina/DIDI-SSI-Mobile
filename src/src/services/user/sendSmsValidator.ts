import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	baseUrl: string;
	did: string;
	cellPhoneNumber: string;
}

async function doSendSmsValidator(args: SendSmsValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendSmsValidator`,
		{ cellPhoneNumber: args.cellPhoneNumber, did: args.did },
		emptyDataCodec
	);
}

const sendSmsValidatorComponent = buildComponentServiceCall(doSendSmsValidator);

export function sendSmsValidator(serviceKey: string, cellPhoneNumber: string) {
	return getState(serviceKey, {})(store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {})(didData => {
			return sendSmsValidatorComponent(serviceKey, { baseUrl, did: didData.did, cellPhoneNumber })(() => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
