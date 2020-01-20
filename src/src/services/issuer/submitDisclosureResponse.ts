import { SelectiveDisclosureResponse } from "didi-sdk";
import { left, right } from "fp-ts/lib/Either";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";

export interface SubmitDisclosureResponseContent {
	token: string;
	callback: string;
}

const submitDisclosureResponseComponent = buildComponentServiceCall(async (args: SubmitDisclosureResponseContent) => {
	try {
		await SelectiveDisclosureResponse.submit({ callback: args.callback, token: args.token });
		return right({});
	} catch (submitError) {
		return left(serviceErrors.common.FETCH_ERR);
	}
});

export function submitDisclosureResponse(serviceKey: string, args: SubmitDisclosureResponseContent) {
	return submitDisclosureResponseComponent(serviceKey, args, () => {
		return serviceCallSuccess(serviceKey);
	});
}
