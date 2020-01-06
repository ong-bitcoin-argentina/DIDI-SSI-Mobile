import * as t from "io-ts";

export const errorDataCodec = t.type(
	{
		errorCode: t.string,
		message: t.string
	},
	"errorData"
);
export type ErrorData = typeof errorDataCodec._A;
