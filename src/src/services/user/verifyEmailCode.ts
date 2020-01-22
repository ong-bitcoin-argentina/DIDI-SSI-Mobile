import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface VerifyEmailCodeArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	email: string;
	validationCode: string;
}

const verifyEmailCodeComponent = buildComponentServiceCall(async (args: VerifyEmailCodeArguments) =>
	convertError(await args.api.verifyEmailCode(args.did, args.validationCode, args.email))
);

export function verifyEmailCode(serviceKey: string, email: string, validationCode: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, {}, did => {
			return verifyEmailCodeComponent(serviceKey, { api, did, email, validationCode }, certData => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
