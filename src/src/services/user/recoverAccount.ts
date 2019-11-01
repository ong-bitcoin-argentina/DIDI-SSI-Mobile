import * as t from "io-ts";

import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { commonUserRequest } from "./userServiceCommon";

export interface RecoverAccountArguments {
	email: string;
	password: string;
}

const responseCodec = t.type({
	privateKeySeed: t.string
});

async function recoverAccount(baseUrl: string, args: RecoverAccountArguments) {
	return commonUserRequest(`${baseUrl}/recoverAccount`, { eMail: args.email, password: args.password }, responseCodec);
}

export type RecoverAccountAction = ServiceAction<
	"SERVICE_RECOVER_ACCOUNT",
	RecoverAccountArguments,
	typeof responseCodec._A,
	ErrorData
>;

export type RecoverAccountState = ServiceStateOf<RecoverAccountAction>;

export const recoverAccountReducer = serviceReducer(
	config => (args: RecoverAccountArguments) => recoverAccount(config.didiUserServer, args),
	(act): act is RecoverAccountAction => act.type === "SERVICE_RECOVER_ACCOUNT"
);
