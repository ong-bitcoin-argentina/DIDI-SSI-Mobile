import { Either } from "fp-ts/lib/Either";
import { readFile } from "react-native-fs";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { DocumentBarcodeData } from "../../model/DocumentBarcodeData";
import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";

import { handleDniValidationResponse, ValidateDniResponseCodec } from "./checkValidateDni";
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

	pictures: { front: { uri: string }; back: { uri: string }; selfie: { uri: string } };
}

async function doValidateDni(
	args: ValidateDniArguments
): Promise<Either<ErrorData, typeof ValidateDniResponseCodec._A>> {
	const frontImage = await readFile(args.pictures.front.uri, "base64");
	const backImage = await readFile(args.pictures.back.uri, "base64");
	const selfieImage = await readFile(args.pictures.selfie.uri, "base64");

	const response = await commonUserRequest(
		"POST",
		`${args.baseUrl}/renaper/validateDni`,
		{
			did: args.did.did(),
			dni: args.dni,
			gender: args.gender,
			name: args.firstName,
			lastName: args.lastName,
			birthDate: args.birthDate,
			order: args.order,
			selfieImage,
			frontImage,
			backImage
		},
		ValidateDniResponseCodec
	);
	return response;
}

const validateDniComponent = buildComponentServiceCall(doValidateDni);

export function validateDni(
	serviceKey: string,
	barcodeData: DocumentBarcodeData,
	pictures: { front: { uri: string }; back: { uri: string }; selfie: { uri: string } }
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

				pictures
			};
			return validateDniComponent(serviceKey, args, response => {
				return simpleAction(serviceKey, { type: "VALIDATE_DNI_START", operationId: response.operationId }, () => {
					return handleDniValidationResponse(serviceKey, response, () => {
						return serviceCallSuccess(serviceKey);
					});
				});
			});
		});
	});
}
