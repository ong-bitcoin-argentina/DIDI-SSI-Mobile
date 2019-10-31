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

export interface ServiceCallState {
	checkDid: CheckDIDState;
	submitDisclosureResponse: SubmitDisclosureResponseState;
	sendSmsValidator: SendSmsValidatorState;
	sendMailValidator: SendMailValidatorState;
}

export type ServiceCallAction =
	| CheckDIDAction
	| SubmitDisclosureResponseAction
	| SendSmsValidatorAction
	| SendMailValidatorAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	checkDid: checkDidReducer,
	submitDisclosureResponse: submitDisclosureResponseReducer,
	sendSmsValidator: sendSmsValidatorReducer,
	sendMailValidator: sendMailValidatorReducer
});
