import { Cmd } from "redux-loop";

import { ComponentServiceCall } from "../common/componentServiceCall";

import { NormalizedStoreContent } from "../../store/normalizedStore";
import { denormalizeStore, StoreContent } from "../../store/store";

function doGetState(get: () => NormalizedStoreContent) {
	return denormalizeStore(get());
}

export const getState: ComponentServiceCall<{}, StoreContent> = (serviceKey, args, next) => {
	return {
		type: "SERVICE_CALL_START",
		serviceKey,
		call: Cmd.run(doGetState, {
			args: [Cmd.getState],
			successActionCreator: next
		})
	};
};
