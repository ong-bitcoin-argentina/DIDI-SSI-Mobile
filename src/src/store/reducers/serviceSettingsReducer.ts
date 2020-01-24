import { AppConfig } from "../../AppConfig";
import { ServiceSettings } from "../../model/ServiceSettings";
import { StoreAction } from "../StoreAction";

export interface ServiceSettingAction {
	type: "SERVICE_SETTINGS_SET";
	value: ServiceSettings;
}

export function serviceSettingsReducer(state: ServiceSettings | undefined, action: StoreAction): ServiceSettings {
	if (state === undefined) {
		return AppConfig.defaultServiceSettings;
	}

	switch (action.type) {
		case "SERVICE_SETTINGS_SET":
			return action.value;

		default:
			return state;
	}
}
