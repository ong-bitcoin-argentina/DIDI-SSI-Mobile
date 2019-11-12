import { Either, either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall } from "../common/componentServiceCall";
import { ErrorData, serviceErrors } from "../common/serviceErrors";

import { EthrDID } from "../../uPort/types/EthrDID";

async function doWithExistingDid(args: {}): Promise<Either<ErrorData, EthrDID>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		if (addresses.length === 0) {
			return left(serviceErrors.did.READ_ERROR);
		} else {
			return EthrDID.fromKeyAddress(addresses[0]);
		}
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

export const withExistingDid = buildComponentServiceCall(doWithExistingDid);
