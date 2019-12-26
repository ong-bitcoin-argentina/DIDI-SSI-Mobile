import { Either, either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { EthrDID } from "../../model/EthrDID";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { ServiceCallAction } from "../ServiceStateStore";

async function doEnsureDid(args: {}): Promise<Either<ErrorData, EthrDID>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		const addressToUse = addresses.length === 0 ? (await RNUportHDSigner.createSeed("simple")).address : addresses[0];
		return EthrDID.fromKeyAddress(addressToUse);
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

const ensureDidComponent = buildComponentServiceCall(doEnsureDid);

export function ensureDid(serviceKey: string, andThen: ServiceCallAction) {
	return ensureDidComponent(serviceKey, {}, did => andThen);
}
