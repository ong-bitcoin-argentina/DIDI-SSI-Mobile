import { ServiceSettings } from "../../model/ServiceSettings";
import { StoreAction } from "../StoreAction";

export interface ServiceSettingAction {
	type: "SERVICE_SETTINGS_SET";
	value: ServiceSettings;
}

export const defaultServiceSettings: ServiceSettings = {
	sharePrefix: "http://192.168.2.144:8080/api/credential_viewer",

	// trustGraphUri: "http://mou.nec.com.ar/graphql",
	// trustGraphUri: "https://edge.uport.me/graphql",
	trustGraphUri: "http://192.168.2.144:3001/graphql",

	ethrDidUri: "https://rinkeby.infura.io/ethr-did",

	// didiUserServer: "http://didi.nec.com.ar:8089/api/1.0/didi"
	didiUserServer: "http://192.168.2.144:3000/api/1.0/didi"
};

export function serviceSettingsReducer(state: ServiceSettings | undefined, action: StoreAction): ServiceSettings {
	if (state === undefined) {
		return defaultServiceSettings;
	}

	switch (action.type) {
		case "SERVICE_SETTINGS_SET":
			return action.value;

		default:
			return state;
	}
}
