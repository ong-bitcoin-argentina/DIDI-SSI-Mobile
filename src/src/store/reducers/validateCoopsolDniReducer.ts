import { StoreAction } from "../StoreAction";

export enum ValidationStates {
	inProgress = "IN_PROGRESS",
	failure = "FAILURE",
	success = "SUCCESS",
	requested = "REQUESTED"
}

export type ValidateCoopsolDniState = ValidationStates | null;

interface ActionStart {
	type: "VALIDATE_COOPSOL_DNI_START";
}
interface ActionSet {
	type: "VALIDATE_COOPSOL_DNI_SET";
	state: ValidateCoopsolDniState;
}
interface ActionReset {
	type: "VALIDATE_COOPSOL_DNI_RESET";
}

export type ValidateCoopsolDniAction = ActionStart | ActionSet | ActionReset;

export function validateCoopsolDniReducer( state: ValidateCoopsolDniState = null, action: StoreAction ): ValidateCoopsolDniState {
	switch (action.type) {
		case "VALIDATE_COOPSOL_DNI_START":
			return ValidationStates.inProgress;

		case "VALIDATE_COOPSOL_DNI_SET":
			return action.state;

		case "VALIDATE_COOPSOL_DNI_RESET":
			return null;

		default:
			return state;
	}
}
