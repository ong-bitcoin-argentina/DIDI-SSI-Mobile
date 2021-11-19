import { CommonServiceRequestError, DecodeErrorReporter, ErrorData } from "@proyecto-didi/app-sdk";
import { Either, isRight, left } from "fp-ts/lib/Either";

import { assertUnreachable } from "../../util/assertUnreachable";

import { serviceErrors } from "../../presentation/resources/serviceErrors";

export function convertError<A>(from: Either<CommonServiceRequestError, A>): Either<ErrorData, A> {
	if (isRight(from)) {
		return from;
	}

	switch (from.left.type) {
		case "FETCH_ERROR":
			return left(serviceErrors.common.FETCH_ERR);
		case "JSON_ERROR":
			return left(serviceErrors.common.JSON_ERR);
		case "DECODE_ERROR":
			// eslint-disable-next-line no-case-declarations
			const message = DecodeErrorReporter.extractIoError(from.left.error).join("\n\n");
			return left(serviceErrors.common.DECODE_ERR(message));
		case "SERVER_ERROR":
			return left(from.left.error);
		case "CRYPTO_ERROR":
			return left(serviceErrors.common.CRYPTO_ERR);
		default:
			assertUnreachable(from.left);
	}
}
