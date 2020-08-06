import { EthrDID } from "didi-sdk";

import { StoreAction } from "../StoreAction";

export type ActiveDid = EthrDID | null;

export interface DidState {
	activeDid: ActiveDid;
	didDni: boolean;
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
	didDni: false
};

export function didReducer(state: ReceivedState = initialValue, action: StoreAction): DidState {
	switch (action.type) {
		case "SET_ACTIVE_DID":
			return { ...state, activeDid: action.value };

		case "SET_DID_DNI":
			return { ...state, didDni: action.value };

		case "RESET_DID_DNI":
			return initialValue;

		default:
			return state;
	}
}
