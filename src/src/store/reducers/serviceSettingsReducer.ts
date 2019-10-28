import { ServiceSettings } from "../../model/ServiceSettings";
import { StoreAction } from "../StoreAction";

export interface ServiceSettingAction {
	type: "SERVICE_SETTINGS_SET";
	value: ServiceSettings;
}

export const defaultServiceSettings: ServiceSettings = {
	sharePrefix: "http://192.168.2.144:8080/api/credential_viewer",
	trustGraphUri: "https://edge.uport.me/graphql",
	ethrDidUri: "https://rinkeby.infura.io/ethr-did"
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
