import { Either, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import { ErrorData } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

async function checkDid(): Promise<Either<ErrorData, string | null>> {
	return RNUportHDSigner.listSeedAddresses().then(
		addresses => {
			if (addresses.length > 0) {
				return right(`did:ethr:${addresses[0]}`);
			} else {
				return right(null);
			}
		},
		err => left({ errorCode: "SIGNER_STORE_ERR", message: "Error al verificar DID almacenado." })
	);
}

export type CheckDIDAction = ServiceAction<"CHECK_DID", {}, string | null, ErrorData>;

export type CheckDIDState = ServiceStateOf<CheckDIDAction>;

export const checkDidReducer = serviceReducer(
	config => (args: {}) => checkDid(),
	(act): act is CheckDIDAction => act.type === "CHECK_DID"
);
