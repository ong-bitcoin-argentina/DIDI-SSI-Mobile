import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { ErrorData } from "../util/ErrorData";
import { JSONObject } from "../util/JSON";

export type CommonServiceRequestError =
	| { type: "FETCH_ERROR"; error: any }
	| { type: "JSON_ERROR"; error: any }
	| { type: "DECODE_ERROR"; error: t.Errors }
	| { type: "SERVER_ERROR"; error: ErrorData };

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function userApiWrapperCodec<M extends t.Mixed>(data: M) {
	return t.union([
		t.type({
			status: t.literal("success"),
			data
		}),
		t.intersection([
			t.type({
				status: t.literal("error")
			}),
			ErrorData.codec
		])
	]);
}

export async function commonServiceRequest<A>(
	method: HTTPMethod,
	url: string,
	dataDecoder: t.Type<A>,
	parameters: JSONObject
): Promise<Either<CommonServiceRequestError, A>> {
	let response: Response;
	try {
		response = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			...(method !== "GET" && { body: JSON.stringify(parameters) })
		});
	} catch (error) {
		return left({ type: "FETCH_ERROR", error });
	}

	let body: unknown;
	try {
		body = await response.json();
	} catch (error) {
		return left({ type: "JSON_ERROR", error });
	}

	const decoded = userApiWrapperCodec(dataDecoder).decode(body);
	if (isLeft(decoded)) {
		return left({ type: "DECODE_ERROR", error: decoded.left });
	} else if (decoded.right.status === "error") {
		return left({
			type: "SERVER_ERROR",
			error: {
				errorCode: decoded.right.errorCode,
				message: decoded.right.message
			}
		});
	} else {
		return right(decoded.right.data);
	}
}
