import { StoreAction } from "../StoreAction";

export interface CodeState {
    code: String
}

interface SetCode {
	type: "SET_CURRENT_VALID_CODE";
	value: string;
}

export type CodeAction = SetCode;

export function phoneVerificationReducer(state: CodeState | undefined, action: StoreAction): CodeState {
	if (state === undefined) {
		return { code: ""};
	}

	switch (action.type) {
		case "SET_CURRENT_VALID_CODE":
			state = { code: action.value };
			return state;

		default:
			return state;
	}
}
