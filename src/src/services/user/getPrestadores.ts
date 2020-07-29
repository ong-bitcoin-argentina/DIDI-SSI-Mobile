import { DidiServerApiClient } from "didi-sdk";
import { right, isRight, left } from "fp-ts/lib/Either";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { withDidiServerClient } from "../internal/withDidiServerClient";
import { ServiceCallAction } from "../ServiceStateStore";
import { PrestadoresResponse } from "../../store/reducers/prestadoresReducer";

const getPrestadoresComponent = buildComponentServiceCall(async (api: DidiServerApiClient) => {
	const response = convertError(await api.getPrestadores());
	console.log(response.left);

	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

function baseGetPrestadores(serviceKey: string, next: () => ServiceCallAction) {
	return withDidiServerClient(serviceKey, {}, api => {
		return getPrestadoresComponent(serviceKey, api, data => {
			return simpleAction(serviceKey, { type: "SET_PRESTADORES", content: data }, next);
		});
	});
}

export function getSemillasPrestadores(serviceKey: string) {
	return baseGetPrestadores(serviceKey, () => serviceCallSuccess(serviceKey));
}
