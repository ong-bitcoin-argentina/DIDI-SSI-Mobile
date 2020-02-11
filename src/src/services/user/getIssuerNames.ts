import { DidiDocument, DidiServerApiClient, EthrDID } from "didi-sdk";
import { array } from "fp-ts/lib/Array";
import { left, right } from "fp-ts/lib/Either";

import TypedArray from "../../util/TypedArray";
import {
	buildComponentServiceCall,
	serviceCallDrop,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { ServiceCallAction } from "../ServiceStateStore";

export interface GetIssuerNamesArguments {
	api: DidiServerApiClient;
	issuers: EthrDID[];
}

const getIssuerNamesComponent = buildComponentServiceCall(async (args: GetIssuerNamesArguments) => {
	const issuers = TypedArray.uniqueElements(args.issuers, (l, r) => l.keyAddress() === r.keyAddress());
	const promises = issuers.map(iss => args.api.getIssuerData(iss));
	const received = await Promise.all(promises);
	const { left: errors, right: data } = array.separate(received);

	if (data.length === 0 && errors.length > 0) {
		return convertError(left(errors[0]));
	}
	return right(data);
});

function baseGetIssuerNames(serviceKey: string, issuers: EthrDID[], next: () => ServiceCallAction) {
	return withDidiServerClient(serviceKey, {}, api => {
		return getIssuerNamesComponent(serviceKey, { api, issuers }, data => {
			return simpleAction(serviceKey, { type: "ISSUER_REGISTER", content: data }, next);
		});
	});
}

export function getAllIssuerNames() {
	const serviceKey = "_getAllIssuerNames";
	return getState(serviceKey, {}, store => {
		const issuers = store.parsedTokens.map(DidiDocument.displayedIssuer);
		return baseGetIssuerNames(serviceKey, issuers, () => {
			return serviceCallDrop(serviceKey);
		});
	});
}

export function getIssuerNames(serviceKey: string, issuers: EthrDID[]) {
	return baseGetIssuerNames(serviceKey, issuers, () => serviceCallSuccess(serviceKey));
}
