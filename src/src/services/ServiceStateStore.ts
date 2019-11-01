import { combineReducers, LiftedLoopReducer } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

import { CheckDIDAction, checkDidReducer, CheckDIDState } from "./internal/checkDid";
import {
	SubmitDisclosureResponseAction,
	submitDisclosureResponseReducer,
	SubmitDisclosureResponseState
} from "./issuer/submitDisclosureResponse";
import { RecoverAccountAction, recoverAccountReducer, RecoverAccountState } from "./user/recoverAccount";
import { RegisterUserAction, registerUserReducer, RegisterUserState } from "./user/registerUser";
import { SendMailValidatorAction, sendMailValidatorReducer, SendMailValidatorState } from "./user/sendMailValidator";
import { SendSmsValidatorAction, sendSmsValidatorReducer, SendSmsValidatorState } from "./user/sendSmsValidator";
import { VerifyEmailCodeAction, verifyEmailCodeReducer, VerifyEmailCodeState } from "./user/verifyEmailCode";
import { VerifySmsCodeAction, verifySmsCodeReducer, VerifySmsCodeState } from "./user/verifySmsCode";

export interface ServiceCallState {
	checkDid: CheckDIDState;
	submitDisclosureResponse: SubmitDisclosureResponseState;
	sendSmsValidator: SendSmsValidatorState;
	verifySmsCode: VerifySmsCodeState;
	sendMailValidator: SendMailValidatorState;
	verifyEmailCode: VerifyEmailCodeState;
	registerUser: RegisterUserState;
	recoverAccount: RecoverAccountState;
}

export type ServiceCallAction =
	| CheckDIDAction
	| SubmitDisclosureResponseAction
	| SendSmsValidatorAction
	| VerifySmsCodeAction
	| SendMailValidatorAction
	| VerifyEmailCodeAction
	| RegisterUserAction
	| RecoverAccountAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	checkDid: checkDidReducer,
	submitDisclosureResponse: submitDisclosureResponseReducer,
	sendSmsValidator: sendSmsValidatorReducer,
	verifySmsCode: verifySmsCodeReducer,
	sendMailValidator: sendMailValidatorReducer,
	verifyEmailCode: verifyEmailCodeReducer,
	registerUser: registerUserReducer,
	recoverAccount: recoverAccountReducer
});
