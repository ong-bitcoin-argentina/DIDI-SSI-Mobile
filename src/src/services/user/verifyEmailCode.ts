import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifyEmailCodeArguments {
	validationCode: string;
	did: string;
}

async function verifyEmailCode(baseUrl: string, args: VerifyEmailCodeArguments) {
	return commonUserRequest(
		`${baseUrl}/verifyMailCode`,
		{ validationCode: args.validationCode, did: args.did },
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
