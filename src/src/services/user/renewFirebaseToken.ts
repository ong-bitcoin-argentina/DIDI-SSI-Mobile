import { DidiServerApiClient } from "didi-sdk";
import { right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { getCredentials } from "../../uPort/getCredentials";
import { withDidiServerClient } from "../internal/withDidiServerClient";

export interface RenewFirebaseTokenArguments {
	api: DidiServerApiClient;
	firebaseId: string;
}

const renewFirebaseTokenComponent = buildComponentServiceCall(async (args: RenewFirebaseTokenArguments) => {
	const seeds = await RNUportHDSigner.listSeedAddresses();
	if (seeds.length > 0) {
		const credentials = await getCredentials();
		return convertError(await args.api.renewFirebaseToken(credentials, args.firebaseId));
	} else {
		return right({});
	}
});

export function renewFirebaseToken(serviceKey: string, firebaseId: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return renewFirebaseTokenComponent(serviceKey, { api, firebaseId }, () => {
			return serviceCallSuccess(serviceKey);
		});
	});
}
