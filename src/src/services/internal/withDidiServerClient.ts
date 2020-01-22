import { DidiServerApiClient } from "didi-sdk";

import { ComponentServiceCall } from "../common/componentServiceCall";

import { getState } from "./getState";

export const withDidiServerClient: ComponentServiceCall<{}, DidiServerApiClient> = (serviceKey, args, next) => {
	return getState(serviceKey, args, store => {
		return next(new DidiServerApiClient({ didiServerUri: store.serviceSettings.didiUserServer }));
	});
};
