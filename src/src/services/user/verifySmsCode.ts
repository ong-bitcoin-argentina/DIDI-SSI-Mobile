import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface VerifySmsCodeArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	phoneNumber: string;
	validationCode: string;
}

const verifySmsCodeComponent = buildComponentServiceCall(async (args: VerifySmsCodeArguments) =>
	convertError(await args.api.verifySmsCode(args.did, args.validationCode, args.phoneNumber))
);

export function verifySmsCode(serviceKey: string, phoneNumber: string, validationCode: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, {}, did => {
			return verifySmsCodeComponent(serviceKey, { api, did, phoneNumber, validationCode }, certData => {
				return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
