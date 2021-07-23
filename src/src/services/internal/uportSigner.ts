import { ErrorData, EthrDID } from "didi-sdk";
import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { RNUportHDSigner } from "react-native-uport-signer";

import {
	buildComponentServiceCall,
	ComponentServiceCall,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { ActiveDid } from "../../store/reducers/didReducer";
import { ServiceCallAction } from "../ServiceStateStore";

async function doEnsureSeed(): Promise<Either<ErrorData, EthrDID>> {
	try {
		const seeds = await RNUportHDSigner.listSeedAddresses();
		if (seeds.length > 0) {
			return right(EthrDID.fromKeyAddress(seeds[0]));
		}

		const address = await RNUportHDSigner.createSeed("simple");
		return right(EthrDID.fromKeyAddress(address.address));
	} catch (error) {
		return left(serviceErrors.did.WRITE_ERROR);
	}
}

async function doDeleteSeed(): Promise<Either<ErrorData, null>> {
	try {
		const seeds = await RNUportHDSigner.listSeedAddresses();
		await Promise.all(seeds.map(seed => RNUportHDSigner.deleteSeed(seed)));
		return right(null);
	} catch (error) {
		return left(serviceErrors.did.DELETE_ERROR);
	}
}

async function doImportSeed(args: { phrase: string }): Promise<Either<ErrorData, EthrDID>> {
	try {
		const isValid = await RNUportHDSigner.validateMnemonic(args.phrase);
		if (!isValid) {
			return left(serviceErrors.did.PARSE_MNEMONIC);
		}

		const deleteResult = await doDeleteSeed();
		if (isLeft(deleteResult)) {
			return deleteResult;
		}

		const address = await RNUportHDSigner.importSeed(args.phrase, "simple");
		return right(EthrDID.fromKeyAddress(address.address));
	} catch (error) {
		return left(serviceErrors.did.WRITE_ERROR);
	}
}

function saveUpdatedDid<Args, T extends ActiveDid>(call: ComponentServiceCall<Args, T>): ComponentServiceCall<Args, T> {
	return (serviceKey: string, args: Args, next: (args: T) => ServiceCallAction) => {
		return call(serviceKey, args, value => {
			return simpleAction(serviceKey, { type: "SET_ACTIVE_DID", value }, () => next(value));
		});
	};
}

export function ensureDid(serviceKey: string, andThen?: (did: EthrDID) => ServiceCallAction) {
	const doEnsureDid = saveUpdatedDid(buildComponentServiceCall(doEnsureSeed));
	if (andThen) {
		return doEnsureDid(serviceKey, {}, andThen);
	} else {
		return doEnsureDid(serviceKey, {}, () => serviceCallSuccess(serviceKey));
	}
}

export function importDid(serviceKey: string, phrase: string, andThen?: (did: EthrDID) => ServiceCallAction) {
	const doImportDid = saveUpdatedDid(buildComponentServiceCall(doImportSeed));
	if (andThen) {
		return doImportDid(serviceKey, { phrase }, andThen);
	} else {
		return doImportDid(serviceKey, { phrase }, () => serviceCallSuccess(serviceKey));
	}
}

export function deleteDid(serviceKey: string) {
	const doDeleteDid = saveUpdatedDid(buildComponentServiceCall(doDeleteSeed));
	return doDeleteDid(serviceKey, {}, () => {
		return serviceCallSuccess(serviceKey);
	});
}
