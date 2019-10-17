interface TokenActionEnsure {
	type: "TOKEN_ENSURE";
	content: string[];
}
interface TokenActionDeleteAll {
	type: "TOKEN_DELETE_ALL";
}
export type TokenAction = TokenActionEnsure | TokenActionDeleteAll;

export function tokenReducer(state: string[] | undefined, action: TokenAction): string[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "TOKEN_ENSURE":
			const toAdd = action.content.filter(doc => !state.includes(doc));
			if (toAdd.length === 0) {
				return state;
			} else {
				return [...toAdd, ...state];
			}

		case "TOKEN_DELETE_ALL":
			return [];

		default:
			return state;
	}
}
