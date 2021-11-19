import { DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";
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
	token: string;
}

const getPersonalDataComponent = buildComponentServiceCall(async (args: Arguments) => {
	const response = convertError(await args.api.getPersonalData(args.did, args.token));
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function getPersonalData(serviceKey: string, token: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, { errorMessage: NO_DID }, did => {
			return getPersonalDataComponent(serviceKey, { api, did, token }, data => {
				const { name, lastname, imageUrl, imageId } = data;
				return simpleAction(serviceKey, { type: "PERSISTED_PERSONAL_DATA_SET", state: { name, lastname, imageUrl, imageId } }, () =>
					serviceCallSuccess(serviceKey)
				);
			});
		});
	});
}
