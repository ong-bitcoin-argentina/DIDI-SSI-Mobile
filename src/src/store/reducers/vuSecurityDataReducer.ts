import { StoreAction } from "../StoreAction";

export type VuSecurityData = {
	operationId: string;
	userName: string;
	vuResponseFront:string,
	vuResponseBack:string,
	vuResponseSelfie:string,
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

interface VuSecurityResponseSelfie{
	type: "VU_SECURITY_RESPONSE_ADD_SELFIE";
	state: VuSecurityData;
}

const initial = {
	operationId: "",
	userName: "",
	vuResponseFront:"",
	vuResponseBack:"",
	vuResponseSelfie:""
};
export type VuSecurityDataAction = VuSecurityDataStart | VuSecurityReset | VuSecurityResponseBack| VuSecurityResponseFront|VuSecurityResponseSelfie;

export function vuSecurityDataReducer(
	state: VuSecurityData = initial,
	action: StoreAction
): VuSecurityData {
	switch (action.type) {
		case "VU_SECURITY_DATA_SET":
			return action.state;
		case "VU_SECURITY_RESPONSE_ADD_FRONT":
			return { ...state,vuResponseFront: action.state.vuResponseFront };
		case "VU_SECURITY_RESPONSE_ADD_BACK":
			return { ...state, vuResponseBack: action.state.vuResponseBack };
		case "VU_SECURITY_RESPONSE_ADD_SELFIE":
			console.log('EN VISTA');
			console.log(action.state.vuResponseSelfie);
			return {...state,vuResponseSelfie: action.state.vuResponseSelfie };
		case "VU_SECURITY_DATA_RESET":
			return initial;
		default:
			return state;
	}
}
