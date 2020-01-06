import * as t from "io-ts";

export const ClaimValueCodec = t.union([t.string, t.number, t.null], "ClaimValue");

export const ClaimDataCodec = t.record(t.string, ClaimValueCodec);

export type ClaimData = typeof ClaimDataCodec._A;

export type ClaimDataPairs = Array<{ label: string; value: typeof ClaimValueCodec._A }>;
