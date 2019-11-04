import { isLeft } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { ensureDid } from "../internal/ensureDid";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface RegisterUserArguments {
	email: string;
	password: string;
	phoneNumber: string;
}

async function registerUser(baseUrl: string, args: RegisterUserArguments) {
	const didData = await ensureDid();
	if (isLeft(didData)) {
		return didData;
	}
	const phrase = await RNUportHDSigner.showSeed(didData.right.address, "");
	const privateKeySeed = Buffer.from(phrase, "utf8").toString("base64");

	return commonUserRequest(
		`${baseUrl}/registerUser`,
		{
			eMail: args.email,
			password: args.password,
			phoneNumber: args.phoneNumber,
			did: didData.right.did,
			privateKeySeed
		},
		emptyDataCodec
	);
}

export type RegisterUserAction = ServiceAction<"SERVICE_REGISTER_USER", RegisterUserArguments, {}, ErrorData>;

export type RegisterUserState = ServiceStateOf<RegisterUserAction>;

export const registerUserReducer = serviceReducer(
	config => (args: RegisterUserArguments) => registerUser(config.didiUserServer, args),
	(act): act is RegisterUserAction => act.type === "SERVICE_REGISTER_USER"
);
