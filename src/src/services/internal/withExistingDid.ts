import { ErrorData, EthrDID } from "@proyecto-didi/app-sdk";
import { Either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall } from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";

async function doWithExistingDid(args: { errorMessage?: ErrorData }): Promise<Either<ErrorData, EthrDID>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		if (addresses.length === 0) {
			return left(args.errorMessage || serviceErrors.did.READ_ERROR);
		} else {
			return right(EthrDID.fromKeyAddress(addresses[0]));
		}
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

export const withExistingDid = buildComponentServiceCall(doWithExistingDid);
