import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendMailValidatorArguments {
	baseUrl: string;
	did: string;
	email: string;
}

async function doSendMailValidator(args: SendMailValidatorArguments) {
	return commonUserRequest(`${args.baseUrl}/sendMailValidator`, { eMail: args.email, did: args.did }, emptyDataCodec);
}

const sendMailValidatorComponent = buildComponentServiceCall(doSendMailValidator);

export function sendMailValidator(serviceKey: string, email: string) {
	return getState(serviceKey, {})(store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {})(didData => {
			return sendMailValidatorComponent(serviceKey, { baseUrl, did: didData.did, email })(() => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
