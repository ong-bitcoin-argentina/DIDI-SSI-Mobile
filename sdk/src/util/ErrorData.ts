import * as t from "io-ts";

export const ErrorData = {
	codec: t.type(
		{
			errorCode: t.string,
			message: t.string
		},
		"errorData"
	)
};

export type ErrorData = typeof ErrorData.codec._A;
