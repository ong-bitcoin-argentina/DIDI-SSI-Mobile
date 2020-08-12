import { EthrDID, DidiServerApiClient, SemillasNeedsToValidateDni } from "didi-sdk";
import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { left, right, isRight } from "fp-ts/lib/Either";
import { convertError } from "../common/convertError";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";
const { NO_DID } = serviceErrors.login;

interface ValidateDniArguments {
	api: DidiServerApiClient;
	did: EthrDID;
	data: SemillasNeedsToValidateDni;
}

const validateDniComponent = buildComponentServiceCall(async (args: ValidateDniArguments) => {
	const response = convertError(await args.api.validateDniWithSemillas(args.did, args.data));

	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function validateDniWithSemillas(serviceKey: string, data: SemillasNeedsToValidate) {
	return withDidiServerClient(serviceKey, { errorMessage: NO_DID }, api => {
		return withExistingDid(serviceKey, { errorMessage: NO_DID }, did => {
			return validateDniComponent(serviceKey, { api, did, data }, result => {
				return simpleAction(serviceKey, { type: "VALIDATE_SEMILLAS_DNI_START" }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
