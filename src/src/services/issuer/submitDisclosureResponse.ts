import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { JSONObject } from "../../util/JSON";
import { commonServiceRequest } from "../common/commonServiceRequest";
import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { ErrorData } from "../common/ErrorData";

import { RequestDocument } from "../../model/RequestDocument";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { signDisclosureResponse } from "../../uPort/createDisclosureResponse";

export interface SubmitDisclosureResponseArguments {
	request: RequestDocument;
	own: JSONObject;
	verified: string[];
}

const issuerApiWrapperCodec = t.union([
	t.type({ status: t.literal("success"), data: t.unknown }),
	t.type({ status: t.keyof({ fail: null, error: null }), data: t.string })
]);

async function doSubmitDisclosureResponse(args: SubmitDisclosureResponseArguments): Promise<Either<ErrorData, {}>> {
	let accessToken;
	try {
		accessToken = await signDisclosureResponse(args.request, args.own, args.verified);
	} catch (e) {
		return left(serviceErrors.disclosure.SIGNING_ERR);
	}

	const result = await commonServiceRequest(
		"POST",
		args.request.content.callback,
		{ access_token: accessToken },
		issuerApiWrapperCodec
	);
	if (isLeft(result)) {
		return result;
	}

	switch (result.right.status) {
		case "success":
			return right({});
		case "error":
		case "fail":
			return left(serviceErrors.disclosure.ISSUER_ERR(result.right.data));
	}
}

const submitDisclosureResponseComponent = buildComponentServiceCall(doSubmitDisclosureResponse);

export function submitDisclosureResponse(serviceKey: string, args: SubmitDisclosureResponseArguments) {
	return submitDisclosureResponseComponent(serviceKey, args, () => {
		return serviceCallSuccess(serviceKey);
	});
}
