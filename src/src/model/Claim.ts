import * as t from "io-ts";

export const ClaimDataCodec = t.record(t.string, t.union([t.string, t.number, t.null]));

export type ClaimData = typeof ClaimDataCodec._A;

export type ClaimDataPairs = Array<{ label: string; value: string }>;
