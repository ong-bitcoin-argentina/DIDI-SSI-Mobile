import { DidiServerApiClient } from "@proyecto-didi/app-sdk";

import { ComponentServiceCall } from "../common/componentServiceCall";

import { getState } from "./getState";
import { AppConfig, PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";

export const withDidiServerClient: ComponentServiceCall<{}, DidiServerApiClient> = (serviceKey, args, next) => {
	return getState(serviceKey, args, store => {
		return next(new DidiServerApiClient({ didiServerUri: store.serviceSettings.didiUserServer }, PRIVATE_KEY_SEED_PASSWORD));
	});
};

export const getClient = () => {
	return new DidiServerApiClient({ didiServerUri: AppConfig.defaultServiceSettings.didiUserServer }, PRIVATE_KEY_SEED_PASSWORD);
};
