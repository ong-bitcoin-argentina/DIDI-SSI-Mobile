import { EthrDID } from "didi-sdk";

import { StoreAction } from "../StoreAction";

export type ActiveDid = EthrDID | null;

interface SetActiveDid {
	type: "SET_ACTIVE_DID";
	value: ActiveDid;
}
export type DidAction = SetActiveDid;

export function didReducer(state: ActiveDid | undefined, action: StoreAction): ActiveDid {
	if (state === undefined) {
		return null;
	}

	switch (action.type) {
		case "SET_ACTIVE_DID":
			return action.value;

		default:
			return state;
	}
}
