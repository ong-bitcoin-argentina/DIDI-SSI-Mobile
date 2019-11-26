import * as t from "io-ts";

export const ClaimDataCodec = t.record(t.string, t.string);

export type ClaimData = typeof ClaimDataCodec._A;

export class Claim {
	title: string;
	data: ClaimData;
	preview?: {
		type: number;
		fields: string[];
	};

	constructor(title: string, data: ClaimData, preview?: { type: number; fields: string[] }) {
		this.title = title;
		this.data = data;
		this.preview = preview;
	}
}
