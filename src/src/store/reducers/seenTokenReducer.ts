import { StoreAction } from "../StoreAction";

interface SeenTokenActionAdd {
	type: "SEEN_TOKEN_ADD";
	content: string[];
}
export type SeenTokenAction = SeenTokenActionAdd;

export function seenTokenReducer(state: string[] | undefined, action: StoreAction): string[] {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "SEEN_TOKEN_ADD":
			const toAdd = action.content.filter(doc => !state.includes(doc));
			if (toAdd.length === 0) {
				return state;
			} else {
				return [...toAdd, ...state];
			}

		default:
			return state;
	}
}
