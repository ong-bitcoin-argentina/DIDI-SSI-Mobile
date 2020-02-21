import { StoreAction } from "../StoreAction";

export type PushToken = string;
export interface PushNotificationContent {
	type: "VALIDATION_REQ" | "SHARE_REQ" | "NEW_CERT";
	title: string;
	message: string;
	foreground: boolean;
	userInteraction: boolean;
}

export type PushState = {
	token: PushToken | null;
	hasUnseenRequests: boolean;
	pending: PushNotificationContent[];
};

interface SetPushToken {
	type: "SET_PUSH_TOKEN";
	value: PushToken;
}
interface RegisterPendingPush {
	type: "REGISTER_PUSH";
	value: PushNotificationContent;
}
interface ClearPendingPush {
	type: "CLEAR_PUSH";
	value: PushNotificationContent;
}
interface DidSeeRequests {
	type: "DID_SEE_REQUESTS";
}
export type PushNotificationAction = SetPushToken | RegisterPendingPush | ClearPendingPush | DidSeeRequests;

export function pushNotificationReducer(state: PushState | undefined, action: StoreAction): PushState {
	if (state === undefined) {
		return { token: null, hasUnseenRequests: false, pending: [] };
	}

	switch (action.type) {
		case "SET_PUSH_TOKEN":
			return { ...state, token: action.value };

		case "REGISTER_PUSH":
			return {
				...state,
				hasUnseenRequests:
					state.hasUnseenRequests || action.value.type === "SHARE_REQ" || action.value.type === "VALIDATION_REQ",
				pending: [...state.pending, action.value]
			};

		case "CLEAR_PUSH":
			return { ...state, pending: state.pending.filter(val => val !== action.value) };

		case "DID_SEE_REQUESTS":
			return { ...state, hasUnseenRequests: false };

		default:
			return state;
	}
}
