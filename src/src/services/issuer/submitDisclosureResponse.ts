import { DisclosureResponseContent, submitDisclosureResponse as baseSubmitDisclosureResponse } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getCredentials } from "../../uPort/getCredentials";

const submitDisclosureResponseComponent = buildComponentServiceCall(async (args: DisclosureResponseContent) => {
	const credentials = await getCredentials();
	return convertError(await baseSubmitDisclosureResponse(credentials, args));
});

export function submitDisclosureResponse(serviceKey: string, args: DisclosureResponseContent) {
	return submitDisclosureResponseComponent(serviceKey, args, () => {
		return serviceCallSuccess(serviceKey);
	});
}
