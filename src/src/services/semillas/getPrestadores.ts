import { DidiServerApiClient } from "didi-sdk";
import { right, isRight, left } from "fp-ts/lib/Either";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";

const getPrestadoresComponent = buildComponentServiceCall(async (api: DidiServerApiClient) => {
	const response = convertError(await api.getPrestadores());
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function getSemillasPrestadores(serviceKey: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return getPrestadoresComponent(serviceKey, api, data => {
			return simpleAction(serviceKey, { type: "SET_PRESTADORES", content: data }, () => serviceCallSuccess(serviceKey));
		});
	});
}
