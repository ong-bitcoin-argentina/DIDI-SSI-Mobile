import { Cmd, loop, Loop, RunCmd } from "redux-loop";

import { assertUnreachable } from "../../util/assertUnreachable";

import { StoreAction } from "../../store/StoreAction";

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

export type ServiceAction<Id, Args, R, E> = {
	type: Id;
	serviceAction: ServiceSubAction<Args, R, E>;
};
export type ServiceStateOf<T> = T extends ServiceAction<infer Id, infer Args, infer R, infer E>
	? ServiceState<Args, R, E>
	: never;

type StoreActionTypeValueExtractor<T> = T extends ServiceAction<infer Id, infer Args, infer R, infer E>
	? [T, Id, Args, R, E]
	: never;
type StoreActionTypeValue = StoreActionTypeValueExtractor<StoreAction>;

type ActionOf<T extends StoreActionTypeValue> = T[0];
type IdOf<T extends StoreActionTypeValue> = T[1];
type ArgsOf<T extends StoreActionTypeValue> = T[2];
type ResultOf<T extends StoreActionTypeValue> = T[3];
type ErrorOf<T extends StoreActionTypeValue> = T[4];
type StateOf<T extends StoreActionTypeValue> = ServiceState<T[2], T[3], T[4]>;

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

export function serviceReducer<A extends StoreActionTypeValue>(
	id: IdOf<A>,
	serviceCall: (args: ArgsOf<A>) => ResultOf<A> | Promise<ResultOf<A>>,
	actionPredicate: (action: StoreAction) => action is ActionOf<A>
) {
	return (state: StateOf<A> | undefined, action: StoreAction): StateOf<A> | Loop<StateOf<A>, ActionOf<A>> => {
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
					typedCmdRun<IdOf<A>, ArgsOf<A>, ResultOf<A>, ErrorOf<A>, ActionOf<A>>(
						serviceCall,
						serviceAction.args,
						value => {
							return { type: id, serviceAction: { type: "SUCCESS", value } };
						},
						error => {
							return { type: id, serviceAction: { type: "FAILURE", error } };
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
