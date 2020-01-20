import { Either, left } from "fp-ts/lib/Either";
import * as t from "io-ts";
import Credentials from "uport-credentials/lib/Credentials";

import { commonServiceRequest, CommonServiceRequestError } from "../util/commonServiceRequest";
import { JSONObject } from "../util/JSON";

import { RequestDocument } from "../model/RequestDocument";

export interface DisclosureResponseContent {
	request: RequestDocument;
	ownClaims: JSONObject;
	verifiedClaims: string[];
}

export type SubmitDisclosureResponseError = CommonServiceRequestError | { type: "SIGNING_ERROR"; error: any };

export async function submitDisclosureResponse(
	credentials: Credentials,
	content: DisclosureResponseContent
): Promise<Either<SubmitDisclosureResponseError, unknown>> {
	let accessToken;
	try {
		accessToken = await credentials.createDisclosureResponse({
			req: content.request.jwt,
			own: content.ownClaims,
			verified: content.verifiedClaims
		});
	} catch (error) {
		return left({ type: "SIGNING_ERROR", error });
	}

	return await commonServiceRequest("POST", content.request.callback, t.unknown, {
		access_token: accessToken
	});
}
