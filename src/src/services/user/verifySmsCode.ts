import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest, singleCertificateCodec } from "./userServiceCommon";

export interface VerifySmsCodeArguments {
	validationCode: string;
	did: string;
}

async function verifySmsCode(baseUrl: string, args: VerifySmsCodeArguments) {
	return commonUserRequest(
		`${baseUrl}/verifySmsCode`,
		{ validationCode: args.validationCode, did: args.did },
		singleCertificateCodec
	);
}

export type VerifySmsCodeAction = ServiceAction<
	"SERVICE_VERIFY_SMS_CODE",
	VerifySmsCodeArguments,
	typeof singleCertificateCodec._A,
	ErrorData
>;

export type VerifySmsCodeState = ServiceStateOf<VerifySmsCodeAction>;

export const verifySmsCodeReducer = serviceReducer(
	config => (args: VerifySmsCodeArguments) => verifySmsCode(config.didiUserServer, args),
	(act): act is VerifySmsCodeAction => act.type === "SERVICE_VERIFY_SMS_CODE"
);
