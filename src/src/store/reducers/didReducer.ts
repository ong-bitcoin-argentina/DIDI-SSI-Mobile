import { EthrDID } from "@proyecto-didi/app-sdk";

import { StoreAction } from "../StoreAction";

export type ActiveDid = EthrDID | null;

export interface DidState {
	activeDid: ActiveDid;
	didRequested: boolean;
}

type ReceivedState = DidState | undefined;

interface SetActiveDid {
	type: "SET_ACTIVE_DID";
	value: ActiveDid;
}

interface SetDidDni {
	type: "SET_DID_DNI";
	value: boolean;
}

interface ResetDidDni {
	type: "RESET_DID_DNI";
}

// TODO agregar immutable helper

export type DidAction = SetActiveDid | SetDidDni | ResetDidDni;

const initialValue = {
	activeDid: null,
	didRequested: false
};

export function didReducer(state: ReceivedState = initialValue, action: StoreAction): DidState {
	switch (action.type) {
		case "SET_ACTIVE_DID":
			return { ...state, activeDid: action.value };

		case "SET_DID_DNI":
			return { ...state, didRequested: action.value };

		case "RESET_DID_DNI":
			return initialValue;

		default:
			return state;
	}
}
