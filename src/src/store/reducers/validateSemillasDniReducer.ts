import { StoreAction } from "../StoreAction";
import { ValidateDniState } from "./validateDniProgressReducer";

export type ValidateSemillasDniState = ValidateDniState | { state: "In Progress" };

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
	state: ValidateSemillasDniState | undefined = null,
	action: StoreAction
): ValidateSemillasDniState {
	switch (action.type) {
		case "VALIDATE_SEMILLAS_DNI_START":
			return {
				state: "In Progress"
			};

		case "VALIDATE_SEMILLAS_DNI_SET":
			return action.state;

		case "VALIDATE_SEMILLAS_DNI_RESET":
			return null;

		default:
			return state;
	}
}
