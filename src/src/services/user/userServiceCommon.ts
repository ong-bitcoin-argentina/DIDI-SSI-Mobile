import { chain, Either, isLeft, left, mapLeft, right, tryCatch } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";

import { JSONObject } from "../../util/JSON";

const errorDataCodec = t.type({
	errorCode: t.string,
	message: t.string
});
export type ErrorData = typeof errorDataCodec._A;

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
		return left({ errorCode: "FETCH_ERR", message: "Error al enviar peticion al servidor." });
	}

	let body;
	try {
		body = await response.json();
	} catch (e) {
		return left({ errorCode: "JSON_ERR", message: "Error al interpretar formato de respuesta." });
	}

	return pipe(
		body,
		userApiWrapperCodec(dataDecoder).decode,
		mapLeft(_ => ({ errorCode: "PARSE_ERR", message: "Error al interpretar formato de respuesta." })),
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
