import * as t from "io-ts";

export const ClaimDataCodec = t.record(t.string, t.string);

export type ClaimData = typeof ClaimDataCodec._A;

export type ClaimDataPairs = Array<{ label: string; value: string }>;
