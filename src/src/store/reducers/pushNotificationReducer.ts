import { StoreAction } from "../StoreAction";

export type PushToken = string;
export interface PushNotificationContent {
	type: "VALIDATION_REQ" | "SHARE_REQ" | "NEW_CERT";
	title: string;
	message: string;
	foreground: boolean;
	userInteraction: boolean;
	smallIcon: string;
}

export type PushState = {
	token: PushToken | null;
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
export type PushNotificationAction = SetPushToken | RegisterPendingPush | ClearPendingPush;

export function pushNotificationReducer(state: PushState | undefined, action: StoreAction): PushState {
	if (state === undefined) {
		return { token: null, pending: [] };
	}

	switch (action.type) {
		case "SET_PUSH_TOKEN":
			return { ...state, token: action.value };

		case "REGISTER_PUSH":
			return {
				...state,
				pending: [...state.pending, action.value]
			};

		case "CLEAR_PUSH":
			return { ...state, pending: state.pending.filter(val => val !== action.value) };

		default:
			return state;
	}
}
