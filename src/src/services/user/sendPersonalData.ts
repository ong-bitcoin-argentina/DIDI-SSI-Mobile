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
	name: string;
	lastname: string;
	token: string;
}

const sendPersonalDataComponent = buildComponentServiceCall(async (args: Arguments) => {
	const response = convertError(await args.api.sendPersonalData(args.did, args.name, args.lastname, args.token));
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function sendPersonalData(serviceKey: string, token: string, name: string, lastname: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, { errorMessage: NO_DID }, did => {
			return sendPersonalDataComponent(serviceKey, { api, did, token, name, lastname }, data => {
				return simpleAction(serviceKey, { type: "PERSISTED_PERSONAL_DATA_SET", state: { name, lastname } }, () =>
					serviceCallSuccess(serviceKey)
				);
			});
		});
	});
}
