import { DidiServerApiClient, EthrDID, ValidateDniResponseData } from "@proyecto-didi/app-sdk";
import { Either, isRight, right } from "fp-ts/lib/Either";

import {
	buildComponentServiceCall,
	parallelAction,
	serviceCallDrop,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { convertError } from "../common/convertError";
import { delayed } from "../common/delayed";

import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";
import { ServiceCallAction } from "../ServiceStateStore";
import { recoverTokens } from "../trustGraph/recoverTokens";

export interface CheckValidateDniArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	operationId: string;
}

const checkValidateDniComponent = buildComponentServiceCall(
	async (args: CheckValidateDniArguments): Promise<Either<any, ValidateDniResponseData>> => {
		const response = convertError(await args.api.checkValidateDni(args.did, args.operationId));

		if (isRight(response)) {
			return response;
		} else {
			return right({
				operationId: args.operationId,
				status: "In Progress"
			});
		}
	}
);

export function handleDniValidationResponse(
	serviceKey: string,
	response: ValidateDniResponseData,
	whenInProgress: () => ServiceCallAction
): ServiceCallAction {
	switch (response.status) {
		case "In Progress":
			return simpleAction(serviceKey, { type: "VALIDATE_DNI_COUNT_DOWN" }, whenInProgress);
		case "Successful":
			return simpleAction(serviceKey, { type: "VALIDATE_DNI_RESOLVE", state: { state: "Success" } }, () => {
				return parallelAction(serviceKey, [recoverTokens(), serviceCallSuccess(serviceKey)]);
			});
		case "Falied":
			return simpleAction(
				serviceKey,
				{ type: "VALIDATE_DNI_RESOLVE", state: { state: "Failed", message: response.errorMessage } },
				() => {
					return serviceCallSuccess(serviceKey);
				}
			);
	}
}

export function checkValidateDni(): ServiceCallAction {
	const serviceKey = "_checkValidateDni";
	return withDidiServerClient(serviceKey, {}, api => {
		return getState(serviceKey, {}, store => {
			const localState = store.validateDni;
			if (localState?.state !== "In Progress") {
				return serviceCallDrop(serviceKey);
			}
			const operationId = localState.operationId;

			return withExistingDid(serviceKey, {}, did => {
				return checkValidateDniComponent(serviceKey, { api, did, operationId }, response => {
					return handleDniValidationResponse(serviceKey, response, () => {
						return delayed(serviceKey, { minutes: 1 }, () => {
							return checkValidateDni();
						});
					});
				});
			});
		});
	});
}
