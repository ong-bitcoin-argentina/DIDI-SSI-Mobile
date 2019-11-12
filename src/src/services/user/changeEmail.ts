import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { EthrDID } from "../../uPort/types/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface ChangeEmailArguments {
	baseUrl: string;
	did: EthrDID;
	validationCode: string;
	newEmail: string;
}

async function doChangeEmail(args: ChangeEmailArguments) {
	return commonUserRequest(
		`${args.baseUrl}/changeEmail`,
		{ eMailValidationCode: args.validationCode, did: args.did.did(), newEMail: args.newEmail },
		singleCertificateCodec
	);
}

const changeEmailComponent = buildComponentServiceCall(doChangeEmail);

export function changeEmail(serviceKey: string, newEmail: string, validationCode: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			return changeEmailComponent(serviceKey, { baseUrl, did, validationCode, newEmail }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
