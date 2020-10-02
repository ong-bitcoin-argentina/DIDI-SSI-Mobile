import { StoreAction } from "../StoreAction";

export interface AuthAppsState {
    ronda: Boolean;
}

interface SetRondaAccount {
    type: "SET_RONDA_ACCOUNT";
    value: Boolean
}

export type AuthAppsAction = SetRondaAccount;

const initialState: AuthAppsState = {
    ronda:false
}

export function authAppsReducer(state: AuthAppsState = initialState, action: StoreAction): AuthAppsState {

	switch (action.type) {
		case "SET_RONDA_ACCOUNT":
            return {...state, ronda: action.value }

		default:
			return state;
	}
}