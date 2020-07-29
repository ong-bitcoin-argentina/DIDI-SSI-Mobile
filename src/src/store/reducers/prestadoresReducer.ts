import { PrestadorModel } from "../../model/Prestador";
import { StoreAction } from "../StoreAction";

export type PrestadoresResponse = {
	data: PrestadorModel[];
};

interface PrestadoresActionRegister {
	type: "SET_PRESTADORES";
	content: PrestadoresResponse;
}
export type PrestadoresAction = PrestadoresActionRegister;

export type PrestadoresRegistry = PrestadorModel[];

export function prestadoresReducer(state: PrestadoresRegistry, action: StoreAction): PrestadoresRegistry {
	if (state === undefined) {
		return [];
	}

	switch (action.type) {
		case "SET_PRESTADORES":
			return action.content.data;

		default:
			return state;
	}
}
