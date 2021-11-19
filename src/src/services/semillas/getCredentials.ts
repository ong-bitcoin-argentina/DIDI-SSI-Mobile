import { EthrDID } from "@proyecto-didi/app-sdk";
import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { left, right, isRight } from "fp-ts/lib/Either";
import { DidiServerApiClient } from "@proyecto-didi/app-sdk";
import { convertError } from "../common/convertError";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

interface GetCredentialsArguments {
	api: DidiServerApiClient;
	dni: string;
	did: EthrDID;
}

const getCredentialDidiComponent = buildComponentServiceCall(async (args: GetCredentialsArguments) => {
	const response = convertError(await args.api.semillasCredentialsRequest(args.did, args.dni));

	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function getUserCredentials(serviceKey: string, dni: string) {
	return withDidiServerClient(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, api => {
		return withExistingDid(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, did => {
			return getCredentialDidiComponent(serviceKey, { did, dni, api }, result => {
				return simpleAction(serviceKey, { type: "SET_DID_DNI", value: result.message.length > 0 }, () => {
					return serviceCallSuccess(serviceKey);
				});
			});
		});
	});
}
