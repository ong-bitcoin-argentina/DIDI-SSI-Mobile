import { Either, either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { EthrDID } from "../../model/EthrDID";
import { serviceErrors } from "../../presentation/resources/serviceErrors";

async function doWithExistingDid(args: { errorMessage?: ErrorData }): Promise<Either<ErrorData, EthrDID>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		if (addresses.length === 0) {
			return left(args.errorMessage || serviceErrors.did.READ_ERROR);
		} else {
			return EthrDID.fromKeyAddress(addresses[0]);
		}
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

export const withExistingDid = buildComponentServiceCall(doWithExistingDid);
