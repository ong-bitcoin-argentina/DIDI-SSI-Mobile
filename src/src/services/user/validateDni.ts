import { Either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { DocumentBarcodeData } from "../../model/DocumentBarcodeData";
import { EthrDID } from "../../uPort/types/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { commonUserRequest } from "./userServiceCommon";

export interface ValidateDniArguments {
	baseUrl: string;

	did: EthrDID;

	dni: string;
	gender: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	order: string;

	front: string;
	back: string;
	selfie: string;
}

const responseCodec = t.array(t.string);

async function doValidateDni(args: ValidateDniArguments): Promise<Either<ErrorData, string[]>> {
	return await commonUserRequest(
		`${args.baseUrl}/validateDni`,
		{
			did: args.did.did(),
			dni: args.dni,
			gender: args.gender,
			name: args.firstName,
			lastName: args.lastName,
			birthDate: args.birthDate,
			selfieImage: args.selfie,
			frontImage: args.front,
			backImage: args.back
		},
		responseCodec
	);
}

const validateDniComponent = buildComponentServiceCall(doValidateDni);

export function validateDni(
	serviceKey: string,
	barcodeData: DocumentBarcodeData,
	front: string,
	back: string,
	selfie: string
) {
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		return withExistingDid(serviceKey, {}, did => {
			const args: ValidateDniArguments = {
				baseUrl,
				did,

				dni: barcodeData.dni,
				gender: barcodeData.gender,
				firstName: barcodeData.firstNames,
				lastName: barcodeData.lastNames,
				birthDate: barcodeData.birthDate,
				order: barcodeData.tramitId,

				front,
				back,
				selfie
			};
			return validateDniComponent(serviceKey, args, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
