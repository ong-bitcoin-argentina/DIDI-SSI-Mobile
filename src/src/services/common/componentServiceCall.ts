import { Either, isLeft } from "fp-ts/lib/Either";
import { Cmd, CmdType } from "redux-loop";

import { ErrorData, serviceErrors } from "../common/serviceErrors";
import { typedCmdRun } from "../common/typedCmdRun";

import { StoreAction } from "../../store/StoreAction";
import { ServiceCallAction } from "../ServiceStateStore";

export type ComponentServiceCall<Args, Result> = (
	serviceKey: string,
	args: Args
) => (next: (result: Result) => ServiceCallAction) => ServiceCallAction;

export type Stomp<T, V> = Omit<T, keyof V> & V;

export function serviceCallSuccess(serviceKey: string): ServiceCallAction {
	return { type: "SERVICE_CALL_SUCCESS", serviceKey };
}

export function buildComponentServiceCall<Args, Result>(
	serviceCall: (args: Args) => Promise<Either<ErrorData, Result>>
): ComponentServiceCall<Args, Result> {
	return (serviceKey, args) => next => {
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
					error: serviceErrors.did.READ_ERROR
				})
			)
		};
	};
}
