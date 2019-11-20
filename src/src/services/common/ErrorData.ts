import * as t from "io-ts";

export const errorDataCodec = t.intersection(
	[
		t.type({
			errorCode: t.string,
			message: t.string
		}),
		t.partial({
			title: t.string
		})
	],
	"errorDataCodec"
);
export type ErrorData = typeof errorDataCodec._A;
