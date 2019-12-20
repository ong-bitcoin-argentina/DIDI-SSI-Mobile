import { Either, isRight, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import {
	buildComponentServiceCall,
	serviceCallDrop,
	serviceCallSuccess,
	simpleAction
} from "../common/componentServiceCall";
import { delayed } from "../common/delayed";
import { ErrorData } from "../common/ErrorData";

import { EthrDID } from "../../model/EthrDID";
import { getState } from "../internal/getState";
import { withExistingDid } from "../internal/withExistingDid";
import { ServiceCallAction } from "../ServiceStateStore";

import { commonUserRequest } from "./userServiceCommon";

export const ValidateDniResponseCodec = t.intersection([
	t.type({
		operationId: t.string,
		status: t.keyof({
			"In Progress": null,
			Successful: null,
			Falied: null
		})
	}),
	t.partial({
		errorMessage: t.string
	})
]);

export interface CheckValidateDniArguments {
	baseUrl: string;

	did: EthrDID;
	operationId: string;
}

async function doCheckValidateDni(
	args: CheckValidateDniArguments
): Promise<Either<ErrorData, typeof ValidateDniResponseCodec._A>> {
	const response = await commonUserRequest(
		"POST",
		`${args.baseUrl}/renaper/validateDniState`,
		{
			did: args.did.did(),
			operationId: args.operationId
		},
		ValidateDniResponseCodec
	);
	if (isRight(response)) {
		return response;
	} else {
		return right({
			operationId: args.operationId,
			status: "In Progress"
		});
	}
}

const checkValidateDniComponent = buildComponentServiceCall(doCheckValidateDni);

export function handleDniValidationResponse(
	serviceKey: string,
	response: typeof ValidateDniResponseCodec._A,
	whenInProgress: () => ServiceCallAction
): ServiceCallAction {
	switch (response.status) {
		case "In Progress":
			return simpleAction(serviceKey, { type: "VALIDATE_DNI_COUNT_DOWN" }, whenInProgress);
		case "Successful":
			return simpleAction(serviceKey, { type: "VALIDATE_DNI_RESOLVE", state: { state: "Success" } }, () => {
				return serviceCallSuccess(serviceKey);
			});
		case "Falied":
			return simpleAction(
				serviceKey,
				{ type: "VALIDATE_DNI_RESOLVE", state: { state: "Failure", message: response.errorMessage } },
				() => {
					return serviceCallSuccess(serviceKey);
				}
			);
	}
}

export function checkValidateDni(): ServiceCallAction {
	const serviceKey = "_checkValidateDni";
	return getState(serviceKey, {}, store => {
		const baseUrl = store.serviceSettings.didiUserServer;
		const localState = store.validateDni;

		if (localState?.state !== "In Progress") {
			return serviceCallDrop(serviceKey);
		}
		const operationId = localState.operationId;

		return withExistingDid(serviceKey, {}, did => {
			return checkValidateDniComponent(serviceKey, { baseUrl, did, operationId }, response => {
				return handleDniValidationResponse(serviceKey, response, () => {
					return delayed(serviceKey, { minutes: 1 }, () => {
						return checkValidateDni();
					});
				});
			});
		});
	});
}
