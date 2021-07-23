import { ErrorData, EthrDID } from "didi-sdk";
import { Either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { buildComponentServiceCall, serviceCallDrop, simpleAction } from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { ActiveDid } from "../../store/reducers/didReducer";
import { StoreAction } from "../../store/StoreAction";

async function doReloadDid(): Promise<Either<ErrorData, ActiveDid>> {
	try {
		const addresses = await RNUportHDSigner.listSeedAddresses();
		const addressToUse = addresses.length === 0 ? null : EthrDID.fromKeyAddress(addresses[0]);
		return right(addressToUse);
	} catch (e) {
		return left({ ...serviceErrors.did.READ_ERROR, message: e instanceof Error ? e.message : JSON.stringify(e) });
	}
}

const reloadDidComponent = buildComponentServiceCall(doReloadDid);

export function reloadDid() {
	const serviceKey = "_reloadDid";
	return reloadDidComponent(serviceKey, {}, did => {
		const action: StoreAction = {
			type: "SET_ACTIVE_DID",
			value: did
		};
		return simpleAction(serviceKey, action, () => {
			return serviceCallDrop(serviceKey);
		});
	});
}
