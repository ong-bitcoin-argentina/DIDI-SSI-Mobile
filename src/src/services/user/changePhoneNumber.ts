import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangePhoneNumberArguments {
	baseUrl: string;
	did: EthrDID;
	password: string;
	newPhoneNumber: string;
	validationCode: string;
}

async function doChangePhoneNumber(args: ChangePhoneNumberArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changePhoneNumber`,
		{
			did: args.did.did(),
			phoneValidationCode: args.validationCode,
			newPhoneNumber: args.newPhoneNumber,
			password: args.password
		},
		singleCertificateCodec
	);
}

const changePhoneNumberComponent = buildComponentServiceCall(doChangePhoneNumber);

export function changePhoneNumber(
	serviceKey: string,
	password: string,
	newPhoneNumber: string,
	validationCode: string
) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return changePhoneNumberComponent(
				serviceKey,
				{ baseUrl, did, password, validationCode, newPhoneNumber },
				certData => {
					return simpleAction(serviceKey, { type: "TOKEN_ENSURE", content: [certData.certificate] }, () => {
						return serviceCallSuccess(serviceKey);
					});
				}
			);
		});
	});
}
