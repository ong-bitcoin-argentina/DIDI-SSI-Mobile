import { StoreAction } from "../StoreAction";

export type VuSecurityData = {
	operationId: string;
	userName: string;
	vuResponseFront?:string,
	vuResponseBack?:string,
};

export interface VuSecurityDataStart {
	type: "VU_SECURITY_DATA_SET";
	state: VuSecurityData;
}

interface VuSecurityReset {
	type: "VU_SECURITY_DATA_RESET";
	state: VuSecurityData;
}


interface VuSecurityResponseBack{
	type: "VU_SECURITY_RESPONSE_ADD_BACK";
	state: VuSecurityData;
}

interface VuSecurityResponseFront{
	type: "VU_SECURITY_RESPONSE_ADD_FRONT";
	state: VuSecurityData;
}

const initial = {
	operationId: "",
	userName: "",
	vuResponseFront:"",
	vuResponseBack:"",
};
export type VuSecurityDataAction = VuSecurityDataStart | VuSecurityReset | VuSecurityResponseBack| VuSecurityResponseFront;

export function vuSecurityDataReducer(
	state: VuSecurityData = initial,
	action: StoreAction
): VuSecurityData {
	switch (action.type) {
		case "VU_SECURITY_DATA_SET":
			return action.state;
		case "VU_SECURITY_RESPONSE_ADD_FRONT":
			return { ...state,vuResponseBack: "",vuResponseFront: action.state.vuResponseFront };
		case "VU_SECURITY_RESPONSE_ADD_BACK":
			return { ...state,vuResponseFront:"", vuResponseBack: action.state.vuResponseBack };
		case "VU_SECURITY_DATA_RESET":
			return initial;
		default:
			return state;
	}
}
