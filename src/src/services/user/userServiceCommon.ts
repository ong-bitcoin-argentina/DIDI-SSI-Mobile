import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { JSONObject } from "../../util/JSON";
import { commonServiceRequest, HTTPMethod } from "../common/commonServiceRequest";
import { ErrorData, errorDataCodec } from "../common/ErrorData";

export const emptyDataCodec = t.type({});

export const singleCertificateCodec = t.type({
	certificate: t.string
});

function userApiWrapperCodec<M extends t.Mixed>(data: M) {
	return t.union(
		[
			t.type({
				status: t.literal("success"),
				data
			}),
			t.intersection([
				t.type({
					status: t.literal("error")
				}),
				errorDataCodec
			])
		],
		"userApiWrapperCodec"
	);
}

export async function commonUserRequest<A>(
	method: HTTPMethod,
	url: string,
	parameters: JSONObject,
	dataDecoder: t.Type<A, unknown, unknown>
): Promise<Either<ErrorData, A>> {
	const responseContent = await commonServiceRequest(method, url, parameters, userApiWrapperCodec(dataDecoder));
	if (isLeft(responseContent)) {
		return responseContent;
	}

	switch (responseContent.right.status) {
		case "success":
			return right(responseContent.right.data);
		case "error":
			return left(responseContent.right);
	}
}
