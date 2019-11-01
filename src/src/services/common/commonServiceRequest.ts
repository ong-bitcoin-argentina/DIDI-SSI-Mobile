import { Either, left, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";

import { JSONObject } from "../../util/JSON";
import { ErrorData, serviceErrors } from "../common/serviceErrors";

export async function commonServiceRequest<A>(
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

	let body: unknown;
	try {
		body = await response.json();
	} catch (e) {
		return left(serviceErrors.common.JSON_ERR);
	}

	return pipe(
		body,
		dataDecoder.decode,
		//mapLeft(_ => serviceErrors.common.PARSE_ERR)
		mapLeft(err => ({
			errorCode: "RAW_PARSE_ERR",
			message:
				JSON.stringify(err ? err[0].context[err[0].context.length - 1] : [], null, 4) + "\n\n" + JSON.stringify(body)
		}))
	);
}
