import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { EthrDID } from "../../model/EthrDID";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";

import { commonUserRequest } from "./userServiceCommon";

export interface RecoverAccountArguments {
	baseUrl: string;
	email: string;
	password: string;
}

const responseCodec = t.type({
	privateKeySeed: t.string
});

async function doRecoverAccount(args: RecoverAccountArguments): Promise<Either<ErrorData, EthrDID>> {
	const recoveryResponse = await commonUserRequest(
		`${args.baseUrl}/recoverAccount`,
		{ eMail: args.email, password: args.password },
		responseCodec
	);
	if (isLeft(recoveryResponse)) {
		return recoveryResponse;
	}

	try {
		const phrase = Buffer.from(recoveryResponse.right.privateKeySeed, "base64").toString("utf8");
		const nextAddress = await RNUportHDSigner.importSeed(phrase, "simple");

		const addresses = await RNUportHDSigner.listSeedAddresses();
		addresses.filter(addr => addr !== nextAddress.address).forEach(seed => RNUportHDSigner.deleteSeed(seed));

		return EthrDID.fromKeyAddress(nextAddress.address);
	} catch (e) {
		return left(serviceErrors.did.WRITE_ERROR);
	}
}

const recoverAccountComponent = buildComponentServiceCall(doRecoverAccount);

export function recoverAccount(serviceKey: string, email: string, password: string) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return recoverAccountComponent(serviceKey, { baseUrl, email, password }, () => {
			return serviceCallSuccess(serviceKey);
		});
	});
}
