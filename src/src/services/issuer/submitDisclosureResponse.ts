import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { commonServiceRequest } from "../common/commonServiceRequest";
import { ErrorData, serviceErrors } from "../common/serviceErrors";
import { ServiceAction, serviceReducer, ServiceStateOf } from "../common/ServiceState";

import { RequestDocument } from "../../model/RequestDocument";
import { signDisclosureResponse } from "../../uPort/createDisclosureResponse";
import { Claim } from "../../uPort/types/Claim";

export interface SubmitDisclosureResponseArguments {
	request: RequestDocument;
	own: Claim;
	verified: string[];
}

const issuerApiWrapperCodec = t.union([
	t.type({ status: t.literal("success"), data: t.unknown }),
	t.type({ status: t.keyof({ fail: null, error: null }), data: t.string })
]);

async function submitDisclosureResponse(args: SubmitDisclosureResponseArguments): Promise<Either<ErrorData, {}>> {
	let accessToken;
	try {
		accessToken = await signDisclosureResponse(args.request, args.own, args.verified);
	} catch (e) {
		return left(serviceErrors.disclosure.SIGNING_ERR);
	}

	const result = await commonServiceRequest(
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

export type SubmitDisclosureResponseAction = ServiceAction<
	"SERVICE_DISCLOSURE_RESPONSE",
	SubmitDisclosureResponseArguments,
	{},
	ErrorData
>;

export type SubmitDisclosureResponseState = ServiceStateOf<SubmitDisclosureResponseAction>;

export const submitDisclosureResponseReducer = serviceReducer(
	config => submitDisclosureResponse,
	(act): act is SubmitDisclosureResponseAction => act.type === "SERVICE_DISCLOSURE_RESPONSE"
);
