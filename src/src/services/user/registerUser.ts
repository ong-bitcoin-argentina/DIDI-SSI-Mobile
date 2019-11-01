import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest, emptyDataCodec } from "./userServiceCommon";

export interface RegisterUserArguments {
	email: string;
	password: string;
	phoneNumber: string;
	did: string;
	privateKeySeed: string;
}

async function registerUser(baseUrl: string, args: RegisterUserArguments) {
	return commonUserRequest(
		`${baseUrl}/registerUser`,
		{
			eMail: args.email,
			password: args.password,
			phoneNumber: args.phoneNumber,
			did: args.did,
			privateKeySeed: args.privateKeySeed
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
