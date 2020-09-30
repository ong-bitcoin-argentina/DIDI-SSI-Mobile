import { DidiServerApiClient, EthrDID } from "didi-sdk";
import { right, isRight, left } from "fp-ts/lib/Either";
import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
const { NO_DID } = serviceErrors.login;

interface Arguments {
	api: DidiServerApiClient;
	did: EthrDID;
}

const getValidationComponent = buildComponentServiceCall(async (args: Arguments) => {
	const response = convertError(await args.api.getSemillasValidation(args.did));
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function getSemillasValidationState(serviceKey: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, { errorMessage: NO_DID }, did => {
			return getValidationComponent(serviceKey, { api, did }, data => {
				return simpleAction(serviceKey, { type: "VALIDATE_SEMILLAS_DNI_SET", state: data.state }, () =>
					serviceCallSuccess(serviceKey)
				);
			});
		});
	});
}
