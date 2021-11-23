import { Identity } from "@proyecto-didi/app-sdk";

import { StoreAction } from "../StoreAction";

interface IdentityPatch {
	type: "IDENTITY_PATCH";
	value: Identity;
}
export type IdentityAction = IdentityPatch;

export function identityReducer(state: Identity | undefined, action: StoreAction): Identity {
	if (state === undefined) {
		return {
			address: {},
			personalData: {}
		};
	}

	switch (action.type) {
		case "IDENTITY_PATCH":
			return Identity.merge(action.value, state);

		default:
			return state;
	}
}
