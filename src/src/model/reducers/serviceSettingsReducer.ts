import { ServiceSettings } from "../data/ServiceSettings";

export interface ServiceSettingAction {
	type: "SERVICE_SETTINGS_SET";
	value: ServiceSettings;
}

const defaultSettings: ServiceSettings = {
	sharePrefix: "http://192.168.2.144:1234"
};

export function serviceSettingsReducer(
	state: ServiceSettings | undefined,
	action: ServiceSettingAction
): ServiceSettings {
	if (state === undefined) {
		return defaultSettings;
	}

	switch (action.type) {
		case "SERVICE_SETTINGS_SET":
			return action.value;

		default:
			return state;
	}
}
