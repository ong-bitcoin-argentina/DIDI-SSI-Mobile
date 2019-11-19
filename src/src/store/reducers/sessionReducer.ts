import { DidiSession } from "../../model/DidiSession";
import { StoreAction } from "../StoreAction";

interface SessionLogin {
	type: "SESSION_LOGIN";
}
interface SessionLogout {
	type: "SESSION_LOGOUT";
}
export type SessionAction = SessionLogin | SessionLogout;

export const defaultSession: DidiSession = {
	isLoggedIn: false
};

export function sessionReducer(state: DidiSession | undefined, action: StoreAction): DidiSession {
	if (state === undefined) {
		return defaultSession;
	}

	switch (action.type) {
		case "SESSION_LOGIN":
			return { ...state, isLoggedIn: true };

		case "SESSION_LOGOUT":
			return { ...state, isLoggedIn: false };

		default:
			return state;
	}
}
