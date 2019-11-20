import { Identity } from "../../model/Identity";
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
			personalData: {},
			visual: {}
		};
	}

	switch (action.type) {
		case "IDENTITY_PATCH":
			return {
				address: { ...state.address, ...action.value.address },
				personalData: { ...state.personalData, ...action.value.personalData },
				visual: { ...state.visual, ...action.value.visual }
			};

		default:
			return state;
	}
}
