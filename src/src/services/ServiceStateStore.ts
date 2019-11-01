import { combineReducers, LiftedLoopReducer } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

import { CheckDIDAction, checkDidReducer, CheckDIDState } from "./internal/checkDid";
import {
	SubmitDisclosureResponseAction,
	submitDisclosureResponseReducer,
	SubmitDisclosureResponseState
} from "./issuer/submitDisclosureResponse";
import { RecoverAccountAction, recoverAccountReducer, RecoverAccountState } from "./user/recoverAccount";
import { SendMailValidatorAction, sendMailValidatorReducer, SendMailValidatorState } from "./user/sendMailValidator";
import { SendSmsValidatorAction, sendSmsValidatorReducer, SendSmsValidatorState } from "./user/sendSmsValidator";
import { VerifySmsCodeAction, verifySmsCodeReducer, VerifySmsCodeState } from "./user/verifySmsCode";

export interface ServiceCallState {
	checkDid: CheckDIDState;
	submitDisclosureResponse: SubmitDisclosureResponseState;
	sendSmsValidator: SendSmsValidatorState;
	verifySmsCode: VerifySmsCodeState;
	sendMailValidator: SendMailValidatorState;
	recoverAccount: RecoverAccountState;
}

export type ServiceCallAction =
	| CheckDIDAction
	| SubmitDisclosureResponseAction
	| SendSmsValidatorAction
	| VerifySmsCodeAction
	| SendMailValidatorAction
	| RecoverAccountAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	checkDid: checkDidReducer,
	submitDisclosureResponse: submitDisclosureResponseReducer,
	sendSmsValidator: sendSmsValidatorReducer,
	verifySmsCode: verifySmsCodeReducer,
	sendMailValidator: sendMailValidatorReducer,
	recoverAccount: recoverAccountReducer
});
