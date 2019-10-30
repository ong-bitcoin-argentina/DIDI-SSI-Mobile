import { combineReducers, LiftedLoopReducer } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

import {
	SubmitDisclosureResponseAction,
	submitDisclosureResponseReducer,
	SubmitDisclosureResponseState
} from "./issuer/submitDisclosureResponse";
import { SendMailValidatorAction, sendMailValidatorReducer, SendMailValidatorState } from "./user/sendMailValidator";
import { SendSmsValidatorAction, sendSmsValidatorReducer, SendSmsValidatorState } from "./user/sendSmsValidator";

export interface ServiceCallState {
	submitDisclosureResponse: SubmitDisclosureResponseState;
	sendSmsValidator: SendSmsValidatorState;
	sendMailValidator: SendMailValidatorState;
}

export type ServiceCallAction = SubmitDisclosureResponseAction | SendSmsValidatorAction | SendMailValidatorAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	submitDisclosureResponse: submitDisclosureResponseReducer,
	sendSmsValidator: sendSmsValidatorReducer,
	sendMailValidator: sendMailValidatorReducer
});
