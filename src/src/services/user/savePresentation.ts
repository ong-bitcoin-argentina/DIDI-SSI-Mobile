import { DidiServerApiClient } from "didi-sdk";
import { right, isRight, left } from "fp-ts/lib/Either";
import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";
import { withDidiServerClient } from "../internal/withDidiServerClient";

interface Arguments {
	api: DidiServerApiClient;
	jwts: string;
}

const savePresentationComponent = buildComponentServiceCall(async (args: Arguments) => {
    const response = convertError(await args.api.savePresentation(args.jwts));
    console.log(response);
	if (isRight(response)) {
		return right(response.right);
	}
	return left(response.left);
});

export function savePresentation(serviceKey: string, jwts: string) {
	return withDidiServerClient(serviceKey, {}, api => {
		return savePresentationComponent(serviceKey, { api, jwts }, data => {
            return serviceCallSuccess(serviceKey);
        });
	});
}
