import { isLeft } from "fp-ts/lib/Either";

import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { ensureDid } from "../internal/ensureDid";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifyEmailCodeArguments {
	validationCode: string;
}

async function verifyEmailCode(baseUrl: string, args: VerifyEmailCodeArguments) {
	const didData = await ensureDid();
	if (isLeft(didData)) {
		return didData;
	}

	return commonUserRequest(
		`${baseUrl}/verifyMailCode`,
		{ validationCode: args.validationCode, did: didData.right.did },
		singleCertificateCodec
	);
}

export type VerifyEmailCodeAction = ServiceAction<
	"SERVICE_VERIFY_EMAIL_CODE",
	VerifyEmailCodeArguments,
	typeof singleCertificateCodec._A,
	ErrorData
>;

export type VerifyEmailCodeState = ServiceStateOf<VerifyEmailCodeAction>;

export const verifyEmailCodeReducer = serviceReducer(
	config => (args: VerifyEmailCodeArguments) => verifyEmailCode(config.didiUserServer, args),
	(act): act is VerifyEmailCodeAction => act.type === "SERVICE_VERIFY_EMAIL_CODE"
);
