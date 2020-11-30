import { StoreAction } from "../StoreAction";

export type PersistedPersonalData = {
	name?: string;
	lastname?: string;
	imageUrl?: string;
	imageId?: string;
};

export interface PersistedPersonalDataAction {
	type: "PERSISTED_PERSONAL_DATA_SET";
	state: PersistedPersonalData;
}

const initial = {
	name: "",
	lastname: "",
	imageUrl: "",
	imageId: "",
};

export function persistedPersonalDataReducer(
	state: PersistedPersonalData = initial,
	action: StoreAction
): PersistedPersonalData {
	switch (action.type) {
		case "PERSISTED_PERSONAL_DATA_SET":
			return action.state;

		default:
			return state;
	}
}
