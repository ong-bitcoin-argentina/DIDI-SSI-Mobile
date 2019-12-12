import * as t from "io-ts";

import TypedArray from "../util/TypedArray";

export const ClaimDataCodec = t.record(t.string, t.string);

export type ClaimData = typeof ClaimDataCodec._A;

export type ClaimDataPairs = Array<{ label: string; value: string }>;

export function previewForClaimData(
	claim: ClaimDataPairs,
	preview: { type: number; fields: string[] }
): ClaimDataPairs {
	return TypedArray.flatMap(preview.fields, label => claim.find(pair => pair.label === label));
}

export class Claim {
	title: string;
	data: ClaimData;
	wrapped: { [name: string]: string };
	preview?: { type: number; fields: string[] };

	constructor(
		title: string,
		data?: ClaimData,
		wrapped?: { [name: string]: string },
		preview?: { type: number; fields: string[] }
	) {
		this.title = title;
		this.data = data ?? {};
		this.wrapped = wrapped ?? {};
		this.preview = preview;
	}

	dataPairs(): ClaimDataPairs {
		return Object.entries(this.data).map(([label, value]) => ({
			label,
			value
		}));
	}

	numberOfColumns(): 1 | 2 | 3 {
		if (!this.preview) {
			return 1;
		}
		switch (this.preview.type) {
			case 1:
			case 2:
			case 3:
				return this.preview.type;
			default:
				return 1;
		}
	}
}
