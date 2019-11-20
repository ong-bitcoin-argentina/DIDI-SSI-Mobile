import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface SendMailValidatorArguments {
	baseUrl: string;
	email: string;
	idCheck?: {
		did: EthrDID;
		password: string;
	};
}

async function doSendMailValidator(args: SendMailValidatorArguments) {
	return commonUserRequest(
		`${args.baseUrl}/sendMailValidator`,
		{
			eMail: args.email,
			...(args.idCheck && {
				did: args.idCheck.did.did(),
				password: args.idCheck.password
			})
		},
		emptyDataCodec
	);
}

const sendMailValidatorComponent = buildComponentServiceCall(doSendMailValidator);

export function sendMailValidator(serviceKey: string, email: string, password: string | null) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		if (password === null) {
			return sendMailValidatorComponent(serviceKey, { baseUrl, email }, () => {
				return serviceCallSuccess(serviceKey);
			});
		} else {
			return withExistingDid(serviceKey, {}, did => {
				return sendMailValidatorComponent(serviceKey, { baseUrl, email, idCheck: { did, password } }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		}
	});
}
