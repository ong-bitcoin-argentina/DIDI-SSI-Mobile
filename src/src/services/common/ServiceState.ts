import { Action } from "redux";
import { Cmd, loop, Loop, LoopReducer, RunCmd } from "redux-loop";

import { assertUnreachable } from "../../util/assertUnreachable";

import { ServiceSettings } from "../../model/ServiceSettings";

export type ServiceState<Args, R, E> =
	| { state: "NONE" }
	| { state: "PENDING"; args: Args }
	| { state: "SUCCESS"; value: R }
	| { state: "FAILURE"; error: E };

type ServiceSubAction<Args, R, E> =
	| { type: "START"; args: Args }
	| { type: "DROP" }
	| { type: "SUCCESS"; value: R }
	| { type: "FAILURE"; error: E };

export interface ServiceAction<Id, Args, R, E> extends Action<Id> {
	serviceAction: ServiceSubAction<Args, R, E>;
}
export type ServiceStateOf<T> = T extends ServiceAction<infer Id, infer Args, infer R, infer E>
	? ServiceState<Args, R, E>
	: never;

function typedCmdRun<Id, Args, R, E, A extends ServiceAction<Id, Args, R, E>>(
	f: (args: Args) => R | Promise<R>,
	args: Args,
	successActionCreator: (value: R) => A,
	failActionCreator: (error: any) => A
): RunCmd<A> {
	return Cmd.run(f, {
		args: [args],
		successActionCreator,
		failActionCreator
	});
}

export function serviceReducer<Id, Args, R, E>(
	serviceCall: (config: ServiceSettings) => (args: Args) => R | Promise<R>,
	actionPredicate: (action: Action) => action is ServiceAction<Id, Args, R, E>
): LoopReducer<ServiceState<Args, R, E>, Action> {
	return (
		state: ServiceState<Args, R, E> | undefined,
		action: Action,
		config: ServiceSettings
	): ServiceState<Args, R, E> | Loop<ServiceState<Args, R, E>, ServiceAction<Id, Args, R, E>> => {
		if (state === undefined) {
			return { state: "NONE" };
		} else if (!actionPredicate(action)) {
			return state;
		}

		const serviceAction = action.serviceAction;
		switch (serviceAction.type) {
			case "START":
				return loop(
					{ state: "PENDING", args: serviceAction.args },
					typedCmdRun<Id, Args, R, E, ServiceAction<Id, Args, R, E>>(
						serviceCall(config),
						serviceAction.args,
						(value: R): ServiceAction<Id, Args, R, E> => {
							return { type: action.type, serviceAction: { type: "SUCCESS", value } };
						},
						(error: E): ServiceAction<Id, Args, R, E> => {
							return { type: action.type, serviceAction: { type: "FAILURE", error } };
						}
					)
				);
			case "DROP":
				return { state: "NONE" };
			case "SUCCESS":
				return { state: "SUCCESS", value: serviceAction.value };
			case "FAILURE":
				return { state: "FAILURE", error: serviceAction.error };
		}
		return assertUnreachable(serviceAction);
	};
}
