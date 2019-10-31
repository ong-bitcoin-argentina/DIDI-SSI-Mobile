import { combineReducers, LiftedLoopReducer } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

import { CheckDIDAction, checkDidReducer, CheckDIDState } from "./internal/checkDid";
import {
	SubmitDisclosureResponseAction,
	submitDisclosureResponseReducer,
	SubmitDisclosureResponseState
} from "./issuer/submitDisclosureResponse";
import { SendMailValidatorAction, sendMailValidatorReducer, SendMailValidatorState } from "./user/sendMailValidator";
import { SendSmsValidatorAction, sendSmsValidatorReducer, SendSmsValidatorState } from "./user/sendSmsValidator";
import { VerifySmsCodeAction, verifySmsCodeReducer, VerifySmsCodeState } from "./user/verifySmsCode";

export interface ServiceCallState {
	checkDid: CheckDIDState;
	submitDisclosureResponse: SubmitDisclosureResponseState;
	sendSmsValidator: SendSmsValidatorState;
	verifySmsCode: VerifySmsCodeState;
	sendMailValidator: SendMailValidatorState;
}

export type ServiceCallAction =
	| CheckDIDAction
	| SubmitDisclosureResponseAction
	| SendSmsValidatorAction
	| VerifySmsCodeAction
	| SendMailValidatorAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	checkDid: checkDidReducer,
	submitDisclosureResponse: submitDisclosureResponseReducer,
	sendSmsValidator: sendSmsValidatorReducer,
	verifySmsCode: verifySmsCodeReducer,
	sendMailValidator: sendMailValidatorReducer
});
