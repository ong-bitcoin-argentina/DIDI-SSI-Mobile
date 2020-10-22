import { StoreAction } from "../StoreAction";

export type PendingLinkingState = string | null;

interface ActionSet {
	type: "PENDING_LINKING_SET";
	state: PendingLinkingState;
}

interface ActionReset {
	type: "PENDING_LINKING_RESET";
}

export type PendingLinkingAction = ActionSet | ActionReset;

export function pendingLinkingReducer(state: PendingLinkingState = null, action: StoreAction): PendingLinkingState {
	switch (action.type) {
		case "PENDING_LINKING_SET":
			return action.state;

		case "PENDING_LINKING_RESET":
			return null;

		default:
			return state;
	}
}
