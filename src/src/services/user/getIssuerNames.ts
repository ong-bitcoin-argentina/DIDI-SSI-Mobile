import { DidiServerApiClient, EthrDID } from "didi-sdk";
import { array } from "fp-ts/lib/Array";
import { left, right } from "fp-ts/lib/Either";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";

export interface GetIssuerNamesArguments {
	api: DidiServerApiClient;
	issuers: EthrDID[];
}

const getIssuerNamesComponent = buildComponentServiceCall(async (args: GetIssuerNamesArguments) => {
	const promises = args.issuers.map(iss => args.api.getIssuerData(iss));
	const received = await Promise.all(promises);
	const { left: errors, right: data } = array.separate(received);

	if (data.length === 0 && errors.length > 0) {
		return convertError(left(errors[0]));
	}
	return right(data);
});

export function getIssuerNames() {
	const serviceKey = "_getIssuerNames";
	return withDidiServerClient(serviceKey, {}, api => {
		return getState(serviceKey, {}, store => {
			const issuers = store.parsedTokens.map(doc => doc.issuer);
			return getIssuerNamesComponent(serviceKey, { api, issuers }, data => {
				return simpleAction(serviceKey, { type: "ISSUER_REGISTER", content: data }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
