import { Action } from "redux";
import { Cmd, RunCmd } from "redux-loop";

export function typedCmdRun<Args, R, A extends Action>(
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
