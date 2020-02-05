import { DidiServerApiClient, EthrDID } from "didi-sdk";
import { isLeft, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import {
	buildComponentServiceCall,
	parallelAction,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { recoverTokens } from "../trustGraph/recoverTokens";

export interface RecoverAccountArguments {
	api: DidiServerApiClient;
	email: string;
	password: string;
}

const recoverAccountComponent = buildComponentServiceCall(async (args: RecoverAccountArguments) => {
	const response = await args.api.recoverAccount(args.email, args.password, PRIVATE_KEY_SEED_PASSWORD);
	if (isLeft(response)) {
		return convertError(response);
	}

	try {
		const phrase = Buffer.from(response.right.privateKeySeed, "base64").toString("utf8");
		const nextAddress = await RNUportHDSigner.importSeed(phrase, "simple");

		const addresses = await RNUportHDSigner.listSeedAddresses();
		addresses.filter(addr => addr !== nextAddress.address).forEach(seed => RNUportHDSigner.deleteSeed(seed));

		return right(EthrDID.fromKeyAddress(nextAddress.address));
	} catch (e) {
		return left(serviceErrors.did.WRITE_ERROR);
	}
});

export function recoverAccount(serviceKey: string, email: string, password: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return recoverAccountComponent(serviceKey, { api, email, password }, () => {
			return simpleAction(serviceKey, { type: "RESET_PERSISTED_STORE" }, () => {
				return parallelAction(serviceKey, [recoverTokens(), serviceCallSuccess(serviceKey)]);
			});
		});
	});
}
