import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendMailValidatorArguments {
	baseUrl: string;
	did: EthrDID;
	email: string;
	password: string | null;
}

async function doSendMailValidator(args: SendMailValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendMailValidator`,
		{
			eMail: args.email,
			did: args.did.did(),
			...(args.password ? { password: args.password } : {})
		},
		emptyDataCodec
	);
}

const sendMailValidatorComponent = buildComponentServiceCall(doSendMailValidator);

export function sendMailValidator(serviceKey: string, email: string, password: string | null) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return sendMailValidatorComponent(serviceKey, { baseUrl, did, email, password }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
