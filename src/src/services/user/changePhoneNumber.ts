import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { ensureDid } from "../internal/ensureDid";
import { getState } from "../internal/getState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangePhoneNumberArguments {
	baseUrl: string;
	did: EthrDID;
	validationCode: string;
	newPhoneNumber: string;
}

async function doChangePhoneNumber(args: ChangePhoneNumberArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changePhoneNumber`,
		{ phoneValidationCode: args.validationCode, did: args.did.did(), newPhoneNumber: args.newPhoneNumber },
		singleCertificateCodec
	);
}

const changePhoneNumberComponent = buildComponentServiceCall(doChangePhoneNumber);

export function changePhoneNumber(serviceKey: string, newPhoneNumber: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return ensureDid(serviceKey, {}, did => {
			return changePhoneNumberComponent(serviceKey, { baseUrl, did, validationCode, newPhoneNumber }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
