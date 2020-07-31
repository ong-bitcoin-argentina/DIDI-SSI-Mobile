import { PrestadorModel } from "../../model/Prestador";
import { StoreAction } from "../StoreAction";

export type PrestadoresResponse = {
	data: PrestadorModel[];
};

interface PrestadoresActionRegister {
	type: "SET_PRESTADORES";
	content: PrestadoresResponse;
}

interface PrestadoresActionReset {
	type: "RESET_PRESTADORES";
}

export type PrestadoresAction = PrestadoresActionRegister | PrestadoresActionReset;

export type PrestadoresRegistry = PrestadorModel[];

export function prestadoresReducer(state: PrestadoresRegistry, action: StoreAction): PrestadoresRegistry {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "SET_PRESTADORES":
			return action.content.data;
		case "RESET_PRESTADORES":
			return [];

		default:
			return state;
	}
}
