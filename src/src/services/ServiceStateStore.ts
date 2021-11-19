import { ErrorData } from "@proyecto-didi/app-sdk";
import { Action } from "redux";
import { CmdType, liftState, Loop, loop } from "redux-loop";

import { StoreAction } from "../store/StoreAction";

export type SingleServiceCallState =
	| { state: "IN_PROGRESS"; command: CmdType<StoreAction> }
	| { state: "SUCCEEDED" }
	| { state: "FAILED"; error: ErrorData };

export function isPendingService(state: SingleServiceCallState | undefined): boolean {
	if (state === undefined) {
		return false;
	} else if (state.state === "IN_PROGRESS") {
		return true;
	} else {
		return false;
	}
}

interface ServiceCallStartAction extends Action {
	type: "SERVICE_CALL_START";
	serviceKey: string;
	call: CmdType<StoreAction>;
}
interface ServiceCallStopAction extends Action {
	type: "SERVICE_CALL_DROP";
	serviceKey: string;
}
interface ServiceCallSuccessAction extends Action {
	type: "SERVICE_CALL_SUCCESS";
	serviceKey: string;
}
interface ServiceCallFailureAction extends Action {
	type: "SERVICE_CALL_FAILURE";
	serviceKey: string;
	error: ErrorData;
}
export type ServiceCallAction =
	| ServiceCallStartAction
	| ServiceCallStopAction
	| ServiceCallSuccessAction
	| ServiceCallFailureAction;

type Dictionary<K extends keyof any, V> = Partial<Record<K, V>>;

export type ServiceCallState = Dictionary<string, SingleServiceCallState>;

export function serviceCallReducer(
	state: ServiceCallState | undefined,
	action: StoreAction
): Loop<ServiceCallState, StoreAction> {
	const lift = (st: ServiceCallState) => liftState<ServiceCallState, StoreAction>(st);

	if (state === undefined) {
		return lift({});
	}

	switch (action.type) {
		case "SERVICE_CALL_START":
			return loop({ ...state, [action.serviceKey]: { state: "IN_PROGRESS", command: action.call } }, action.call);
		case "SERVICE_CALL_DROP":
			const { [action.serviceKey]: dropped, ...nextState } = state;
			return lift(nextState);
		case "SERVICE_CALL_SUCCESS":
			return lift({ ...state, [action.serviceKey]: { state: "SUCCEEDED" } });
		case "SERVICE_CALL_FAILURE":
			return lift({ ...state, [action.serviceKey]: { state: "FAILED", error: action.error } });
		default:
			return lift(state);
	}
}
