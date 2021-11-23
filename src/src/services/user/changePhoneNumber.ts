import { DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface ChangePhoneNumberArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	password: string;
	newPhoneNumber: string;
	validationCode: string;
	firebaseId: string | undefined;
}

const changePhoneNumberComponent = buildComponentServiceCall(async (args: ChangePhoneNumberArguments) =>
	convertError(await args.api.changePhoneNumber(args.did, args.validationCode, args.newPhoneNumber, args.password))
);

export function changePhoneNumber(
	serviceKey: string,
	password: string,
	newPhoneNumber: string,
	validationCode: string
) {
	return getState(serviceKey, {}, store => {
		const firebaseId = store.pushToken.token ?? undefined;
		return withDidiServerClient(serviceKey, {}, api => {
			return withExistingDid(serviceKey, {}, did => {
				return changePhoneNumberComponent(
					serviceKey,
					{ api, did, password, validationCode, newPhoneNumber, firebaseId },
					certData => {
						return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
							return serviceCallSuccess(serviceKey);
						});
					}
				);
			});
		});
	});
}
