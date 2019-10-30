import { chain, Either, left, mapLeft, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";

import { JSONObject } from "../../util/JSON";
import { ErrorData, errorDataCodec, serviceErrors } from "../common/serviceErrors";

function userApiWrapperCodec<M extends t.Mixed>(data: M) {
	return t.union([
		t.type({
			status: t.literal("success"),
			data
		}),
		t.intersection([
			t.type({
				status: t.literal("failure")
			}),
			errorDataCodec
		])
	]);
}

export const emptyData = t.strict({});

export async function userServiceRequest<A>(
	url: string,
	parameters: JSONObject,
	dataDecoder: t.Type<A, unknown, unknown>
): Promise<Either<ErrorData, A>> {
	let response: Response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(parameters)
		});
	} catch (e) {
		return left(serviceErrors.common.FETCH_ERR);
	}

	let body;
	try {
		body = await response.json();
	} catch (e) {
		return left(serviceErrors.common.JSON_ERR);
	}

	return pipe(
		body,
		userApiWrapperCodec(dataDecoder).decode,
		mapLeft(_ => serviceErrors.common.PARSE_ERR),
		chain(responseContent => {
			switch (responseContent.status) {
				case "success":
					return right(responseContent.data);
				case "failure":
					return left(responseContent);
			}
		})
	);
}
