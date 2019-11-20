import { Identity } from "../../model/Identity";
import { StoreAction } from "../StoreAction";

interface IdentityPatch {
	type: "IDENTITY_PATCH";
	value: Identity;
}
export type IdentityAction = IdentityPatch;

export function identityReducer(state: Identity | undefined, action: StoreAction): Identity {
	if (state === undefined) {
		return {};
	}

	switch (action.type) {
		case "IDENTITY_PATCH":
			return { ...state };

		default:
			return state;
	}
}
