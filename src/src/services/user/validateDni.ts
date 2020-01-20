import { DidiServerApiClient, EthrDID } from "didi-sdk";
import { readFile } from "react-native-fs";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { DocumentBarcodeData } from "../../model/DocumentBarcodeData";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

import { handleDniValidationResponse } from "./checkValidateDni";

export interface ValidateDniArguments {
	api: DidiServerApiClient;
	did: EthrDID;

	data: {
		dni: string;
		gender: string;
		firstName: string;
		lastName: string;
		birthDate: string;
		order: string;
	};
	pictures: {
		front: { uri: string };
		back: { uri: string };
		selfie: { uri: string };
	};
}

const validateDniComponent = buildComponentServiceCall(async (args: ValidateDniArguments) => {
	return convertError(
		await args.api.validateDni(args.did, args.data, {
			front: await readFile(args.pictures.front.uri, "base64"),
			back: await readFile(args.pictures.back.uri, "base64"),
			selfie: await readFile(args.pictures.selfie.uri, "base64")
		})
	);
});

export function validateDni(
	serviceKey: string,
	barcodeData: DocumentBarcodeData,
	pictures: { front: { uri: string }; back: { uri: string }; selfie: { uri: string } }
) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, {}, did => {
			const args: ValidateDniArguments = {
				api,
				did,
				data: {
					dni: barcodeData.dni,
					gender: barcodeData.gender,
					firstName: barcodeData.firstNames,
					lastName: barcodeData.lastNames,
					birthDate: barcodeData.birthDate,
					order: barcodeData.tramitId
				},
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
