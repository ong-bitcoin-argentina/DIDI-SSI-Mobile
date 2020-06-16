import { EthrDID } from "didi-sdk";

import { StoreAction } from "../StoreAction";

export type ActiveDid = EthrDID | null;

export interface DidState {
	activeDid: ActiveDid;
	didDni: boolean;
}

interface SetActiveDid {
	type: "SET_ACTIVE_DID";
	value: EthrDID;
}

interface SetDidDni {
	type: "SET_DID_DNI";
	value: boolean;
}

export type DidAction = SetActiveDid | SetDidDni;

export function didReducer(state: DidState | undefined, action: StoreAction): DidState {
	if (state === undefined) {
		return {
			activeDid: null,
			didDni: false
		};
	}

	switch (action.type) {
		case "SET_ACTIVE_DID":
			return { ...state, ...action.value };

		case "SET_DID_DNI":
			return { ...state, didDni: action.value };

		default:
			return state;
	}
}
