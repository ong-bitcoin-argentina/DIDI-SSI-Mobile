import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendSmsValidatorArguments {
	baseUrl: string;
	cellPhoneNumber: string;
	idCheck?: {
		did: EthrDID;
		password: string;
	};
}

async function doSendSmsValidator(args: SendSmsValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendSmsValidator`,
		{
			cellPhoneNumber: args.cellPhoneNumber,
			...(args.idCheck && {
				did: args.idCheck.did.did(),
				password: args.idCheck.password
			})
		},
		emptyDataCodec
	);
}

const sendSmsValidatorComponent = buildComponentServiceCall(doSendSmsValidator);

export function sendSmsValidator(serviceKey: string, cellPhoneNumber: string, password: string | null) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		if (password === null) {
			return sendSmsValidatorComponent(serviceKey, { baseUrl, cellPhoneNumber }, () => {
				return serviceCallSuccess(serviceKey);
			});
		} else {
			return withExistingDid(serviceKey, {}, did => {
				return sendSmsValidatorComponent(serviceKey, { baseUrl, cellPhoneNumber, idCheck: { did, password } }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		}
	});
}
