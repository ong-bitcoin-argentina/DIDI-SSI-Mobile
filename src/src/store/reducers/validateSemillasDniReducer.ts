import { StoreAction } from "../StoreAction";
import { ValidationStates } from "../../presentation/dashboard/semillas/constants";

export type ValidateSemillasDniState = ValidationStates | null;

interface ActionStart {
	type: "VALIDATE_SEMILLAS_DNI_START";
}
interface ActionSet {
	type: "VALIDATE_SEMILLAS_DNI_SET";
	state: ValidateSemillasDniState;
}
interface ActionReset {
	type: "VALIDATE_SEMILLAS_DNI_RESET";
}

export type ValidateSemillasDniAction = ActionStart | ActionSet | ActionReset;

export function validateSemillasDniReducer(
	state: ValidateSemillasDniState = null,
	action: StoreAction
): ValidateSemillasDniState {
	switch (action.type) {
		case "VALIDATE_SEMILLAS_DNI_START":
			return ValidationStates.inProgress;

		case "VALIDATE_SEMILLAS_DNI_SET":
			return action.state;

		case "VALIDATE_SEMILLAS_DNI_RESET":
			return null;

		default:
			return state;
	}
}
