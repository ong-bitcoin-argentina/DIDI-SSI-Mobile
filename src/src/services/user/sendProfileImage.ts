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
	image: any;
}

const sendProfileImageComponent = buildComponentServiceCall(async (args: Arguments) => {
	const response = convertError(await args.api.sendProfileImage(args.did, args.image));
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function sendPersonalData(serviceKey: string, image: any) {
	return withDidiServerClient(serviceKey, {}, api => {
		return withExistingDid(serviceKey, { errorMessage: NO_DID }, did => {
			return sendProfileImageComponent(serviceKey, { api, did, image }, data => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
