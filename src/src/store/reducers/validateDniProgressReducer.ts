import { StoreAction } from "../StoreAction";

type ValidateDniFinalState =
	| {
			state: "Finished";
		}
	| {
			state: "Success";
		}
	| {
			state: "Failure";
			message?: string;
		};

export type ValidateDniState =
	| {
			state: "In Progress";
			operationId: string;
			remainingAttempts: number;
		}
	| ValidateDniFinalState
	| null;

interface ValidateDniActionStart {
	type: "VALIDATE_DNI_START";
	operationId: string;
}
interface ValidateDniCountDown {
	type: "VALIDATE_DNI_COUNT_DOWN";
}
interface ValidateDniResolve {
	type: "VALIDATE_DNI_RESOLVE";
	state: ValidateDniFinalState;
}
interface ValidateDniReset {
	type: "VALIDATE_DNI_RESET";
}
export type ValidateDniAction = ValidateDniActionStart | ValidateDniCountDown | ValidateDniResolve | ValidateDniReset;

export function validateDniReducer(state: ValidateDniState | undefined = null, action: StoreAction): ValidateDniState {
	switch (action.type) {
		case "VALIDATE_DNI_START":
			return {
				state: "In Progress",
				operationId: action.operationId,
				remainingAttempts: 12
			};

		case "VALIDATE_DNI_COUNT_DOWN":
			if (state?.state !== "In Progress") {
				return state;
			} else if (state.remainingAttempts <= 1) {
				return {
					state: "Failure"
				};
			}
			return {
				...state,
				remainingAttempts: state.remainingAttempts - 1
			};

		case "VALIDATE_DNI_RESOLVE":
			return action.state;

		case "VALIDATE_DNI_RESET":
			return null;

		default:
			return state;
	}
}
