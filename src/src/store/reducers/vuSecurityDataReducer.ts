import { StoreAction } from "../StoreAction";

export type VuSecurityData = {
	operationId: number;
	userName: string;
};

export interface VuSecurityDataAction {
	type: "VU_SECURITY_DATA_SET";
	state: VuSecurityData;
}

const initial = {
	operationId: 0,
	userName: ""
};

export function vuSecurityDataReducer(
	state: VuSecurityData = initial,
	action: StoreAction
): VuSecurityData {
	switch (action.type) {
		case "VU_SECURITY_DATA_SET":
			return action.state;

		default:
			return state;
	}
}
