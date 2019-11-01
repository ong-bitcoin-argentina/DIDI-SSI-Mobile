import { DidiSession } from "../../model/DidiSession";
import { StoreAction } from "../StoreAction";

interface SessionLogin {
	type: "SESSION_LOGIN";
}
interface SessionLogout {
	type: "SESSION_LOGOUT";
}
interface SessionCreateDid {
	type: "SESSION_CREATE_DID";
	did: string;
}
export type SessionAction = SessionLogin | SessionLogout | SessionCreateDid;

export const defaultSession: DidiSession = {
	isLoggedIn: false,
	did: null
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

		case "SESSION_CREATE_DID":
			return { ...state, did: action.did };

		default:
			return state;
	}
}
