import { ErrorData } from "didi-sdk";
import { Either, isLeft } from "fp-ts/lib/Either";
import { Cmd } from "redux-loop";

import { typedCmdRun } from "../common/typedCmdRun";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { StoreAction } from "../../store/StoreAction";
import { ServiceCallAction } from "../ServiceStateStore";

export type ComponentServiceCall<Args, Result> = (
	serviceKey: string,
	args: Args,
	next: (result: Result) => ServiceCallAction
) => ServiceCallAction;

export type Stomp<T, V> = Omit<T, keyof V> & V;

export function serviceCallSuccess(serviceKey: string): ServiceCallAction {
	return { type: "SERVICE_CALL_SUCCESS", serviceKey };
}

export function serviceCallDrop(serviceKey: string): ServiceCallAction {
	return { type: "SERVICE_CALL_DROP", serviceKey };
}

export function parallelAction(serviceKey: string, actions: ServiceCallAction[]): ServiceCallAction {
	return { type: "SERVICE_CALL_START", serviceKey, call: Cmd.list(actions.map(Cmd.action)) };
}

export function simpleAction(
	serviceKey: string,
	action: StoreAction,
	next?: () => ServiceCallAction
): ServiceCallAction {
	if (next) {
		return { type: "SERVICE_CALL_START", serviceKey, call: Cmd.list([Cmd.action(action), Cmd.action(next())]) };
	} else {
		return { type: "SERVICE_CALL_START", serviceKey, call: Cmd.action(action) };
	}
}

export function buildComponentServiceCall<Args, Result>(
	serviceCall: (args: Args) => Promise<Either<ErrorData, Result>>
): ComponentServiceCall<Args, Result> {
	return (serviceKey, args, next) => {
		return {
			type: "SERVICE_CALL_START",
			serviceKey,
			call: typedCmdRun(
				serviceCall,
				args,
				(value: Either<ErrorData, Result>) => {
					if (isLeft(value)) {
						return {
							type: "SERVICE_CALL_FAILURE",
							serviceKey,
							error: value.left
						};
					} else {
						return next(value.right);
					}
				},
				(err: unknown) => ({
					type: "SERVICE_CALL_FAILURE",
					serviceKey,
					error: serviceErrors.common.UNKNOWN_ERR
				})
			)
		};
	};
}
