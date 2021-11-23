import { ErrorData, EthrDID } from "@proyecto-didi/app-sdk";
import { Either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall } from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";

async function doGetPrivateKeySeed(args: { did: EthrDID }): Promise<Either<ErrorData, string>> {
	try {
		const phrase = await RNUportHDSigner.showSeed(args.did.keyAddress(), "");
		return right(Buffer.from(phrase, "utf8").toString("base64"));
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

export const getPrivateKeySeed = buildComponentServiceCall(doGetPrivateKeySeed);
