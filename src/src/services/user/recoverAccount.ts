import { DidiServerApiClient } from "@proyecto-didi/app-sdk";
import { isLeft, left, right } from "fp-ts/lib/Either";

import {
	buildComponentServiceCall,
	parallelAction,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";
import { importDid } from "../internal/uportSigner";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { recoverTokens } from "../trustGraph/recoverTokens";

export interface RecoverAccountArguments {
	api: DidiServerApiClient;
	email: string;
	password: string;
	firebaseId: string | undefined;
}

const recoverAccountComponent = buildComponentServiceCall(async (args: RecoverAccountArguments) => {
	const response = convertError(
		await args.api.recoverAccount(args.email, args.password, args.firebaseId)
	);
	if (isLeft(response)) {
		return response;
	}

	try {
		const phrase = Buffer.from(response.right.privateKeySeed, "base64").toString("utf8");
		return right(phrase);
	} catch (e) {
		return left(serviceErrors.did.PARSE_MNEMONIC);
	}
});

export function recoverAccount(serviceKey: string, email: string, password: string) {
	return getState(serviceKey, {}, store => {
		const firebaseId = store.pushToken.token ?? undefined;
		return withDidiServerClient(serviceKey, {}, api => {
			return recoverAccountComponent(serviceKey, { api, email, password, firebaseId }, phrase => {
				return importDid(serviceKey, phrase, () => {
					return simpleAction(serviceKey, { type: "RESET_PERSISTED_STORE" }, () => {
						return parallelAction(serviceKey, [
							recoverTokens(tokens => simpleAction(serviceKey, { type: "SEEN_TOKEN_ADD", content: tokens })),
							serviceCallSuccess(serviceKey)
						]);
					});
				});
			});
		});
	});
}
