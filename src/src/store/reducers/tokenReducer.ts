import { StoreAction } from "../StoreAction";

interface TokenActionSync {
	type: "TOKEN_SYNC";
	content: string[];
}
interface TokenActionEnsure {
	type: "TOKEN_ENSURE";
	content: string[];
}
interface TokenActionDeleteAll {
	type: "TOKEN_DELETE_ALL";
}
export type TokenAction = TokenActionSync | TokenActionEnsure | TokenActionDeleteAll;

export function tokenReducer(state: string[] | undefined, action: StoreAction): string[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "TOKEN_ENSURE":
		case "TOKEN_SYNC": {
			const toAdd = action.content.filter(doc => !state.includes(doc));
			if (toAdd.length === 0) {
				return state;
			} else {
				return [...toAdd, ...state];
			}
		}
		case "TOKEN_DELETE_ALL":
			return [];

		default:
			return state;
	}
}
