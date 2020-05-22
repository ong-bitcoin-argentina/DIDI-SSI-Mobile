import { StoreAction } from "../StoreAction";

export function tokensInLastSyncReducer(state: string[] | null | undefined, action: StoreAction): string[] | null {
	if (state === undefined) {
		return null;
	}

	switch (action.type) {
		case "TOKEN_SYNC":
			return action.content;

		case "TOKEN_DELETE_ALL":
			return null;

		default:
			return state;
	}
}
