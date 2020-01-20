import * as t from "io-ts";

const ClaimValueCodec = t.union([t.string, t.number, t.null], "ClaimValue");
export const ClaimValue = {
	codec: ClaimValueCodec
};

const ClaimDataCodec = t.record(t.string, ClaimValueCodec);

export type ClaimData = typeof ClaimDataCodec._A;
export const ClaimData = {
	codec: ClaimDataCodec
};

export type ClaimDataPairs = Array<{ label: string; value: typeof ClaimValueCodec._A }>;
