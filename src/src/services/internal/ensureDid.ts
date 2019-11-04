import { Either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { ErrorData, serviceErrors } from "../common/serviceErrors";

interface DidData {
	address: string;
	did: string;
}

export async function ensureDid(): Promise<Either<ErrorData, DidData>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		const addressToUse = addresses.length === 0 ? (await RNUportHDSigner.createSeed("simple")).address : addresses[0];
		return right({ address: addressToUse, did: `did:ethr:${addressToUse}` });
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}
