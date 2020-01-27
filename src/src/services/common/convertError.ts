import { ErrorData } from "didi-sdk";
import { Either, isRight, left } from "fp-ts/lib/Either";

import { CommonServiceRequestError } from "didi-sdk/src/util/commonServiceRequest";
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
			return left(serviceErrors.common.DECODE_ERR(from.left.error));
		case "SERVER_ERROR":
			return left(from.left.error);
		default:
			assertUnreachable(from.left);
	}
}