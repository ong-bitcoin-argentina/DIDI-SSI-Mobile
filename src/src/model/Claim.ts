import * as t from "io-ts";

import TypedArray from "../util/TypedArray";

export const ClaimDataCodec = t.record(t.string, t.string);

export type ClaimData = typeof ClaimDataCodec._A;

export type ClaimDataPairs = Array<{ label: string; value: string }>;

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

	previewPairs(): ClaimDataPairs {
		if (!this.preview) {
			return this.allPairs();
		}
		return TypedArray.flatMap(this.preview.fields, label => {
			const value = this.data[label];
			if (value) {
				return { label, value };
			} else {
				return undefined;
			}
		});
	}

	allPairs(): ClaimDataPairs {
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
