import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangePhoneNumberArguments {
	baseUrl: string;
	did: string;
	validationCode: string;
	newPhoneNumber: string;
}

async function doChangePhoneNumber(args: ChangePhoneNumberArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changePhoneNumber`,
		{ phoneValidationCode: args.validationCode, did: args.did, newPhoneNumber: args.newPhoneNumber },
		singleCertificateCodec
	);
}

const changePhoneNumberComponent = buildComponentServiceCall(doChangePhoneNumber);

export function changePhoneNumber(serviceKey: string, newPhoneNumber: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, didData => {
			return changePhoneNumberComponent(
				serviceKey,
				{ baseUrl, did: didData.did, validationCode, newPhoneNumber },
				() => {
					return serviceCallSuccess(serviceKey);
				}
			);
		});
	});
}
