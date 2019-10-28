import { Reducer } from "redux";
import { combineReducers, LiftedLoopReducer } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

import {
	SubmitDisclosureResponseAction,
	submitDisclosureResponseReducer,
	SubmitDisclosureResponseState
} from "./issuer/submitDisclosureResponse";

export interface ServiceCallState {
	submitDisclosureResponse: SubmitDisclosureResponseState;
}

export type ServiceCallAction = SubmitDisclosureResponseAction;

export const serviceCallReducer: LiftedLoopReducer<ServiceCallState, StoreAction> = combineReducers({
	submitDisclosureResponse: submitDisclosureResponseReducer
});
