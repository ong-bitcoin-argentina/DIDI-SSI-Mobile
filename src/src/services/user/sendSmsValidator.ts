import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	baseUrl: string;
	did: EthrDID;
	cellPhoneNumber: string;
	password: string | null;
}

async function doSendSmsValidator(args: SendSmsValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendSmsValidator`,
		{
			cellPhoneNumber: args.cellPhoneNumber,
			did: args.did.did(),
			...(args.password ? { password: args.password } : {})
		},
		emptyDataCodec
	);
}

const sendSmsValidatorComponent = buildComponentServiceCall(doSendSmsValidator);

export function sendSmsValidator(serviceKey: string, cellPhoneNumber: string, password: string | null) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return sendSmsValidatorComponent(serviceKey, { baseUrl, did, cellPhoneNumber, password }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
