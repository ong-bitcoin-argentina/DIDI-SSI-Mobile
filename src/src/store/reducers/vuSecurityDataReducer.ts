import { StoreAction } from "../StoreAction";

export type VuSecurityData = {
	operationId: string;
	userName: string;
};

export interface VuSecurityDataStart {
	type: "VU_SECURITY_DATA_SET";
	state: VuSecurityData;
}

interface VuSecurityReset {
	type: "VU_SECURITY_DATA_RESET";
	state: VuSecurityData;
}

const initial = {
	operationId: "",
	userName: ""
};
export type VuSecurityDataAction = VuSecurityDataStart | VuSecurityReset;

export function vuSecurityDataReducer(
	state: VuSecurityData = initial,
	action: StoreAction
): VuSecurityData {
	switch (action.type) {
		case "VU_SECURITY_DATA_SET":
			return action.state;
		case "VU_SECURITY_DATA_RESET":
			return initial;
		default:
			return state;
	}
}
