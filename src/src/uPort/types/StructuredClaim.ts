import * as t from "io-ts";

import { SingleKeyedRecordCodec } from "../../util/SingleKeyedRecord";

import { Claim, ClaimDataCodec } from "../../model/Claim";

export const StructuredClaimOuterCodec = SingleKeyedRecordCodec(
	t.partial({
		data: ClaimDataCodec,
		wrapped: t.record(t.string, t.string),
		preview: t.type({
			type: t.number,
			fields: t.array(t.string)
		})
	})
);

type StructuredClaimTransport = typeof StructuredClaimOuterCodec._A;

export const StructuredClaimCodec = StructuredClaimOuterCodec.pipe(
	new t.Type<Claim, StructuredClaimTransport, StructuredClaimTransport>(
		"StructuredClaimCodec",
		(x): x is Claim => x instanceof Claim,
		(i, c) => t.success<Claim>(new Claim(i.key, i.value.data, i.value.wrapped, i.value.preview)),
		a => {
			return {
				key: a.title,
				value: {
					data: a.data,
					preview: a.preview
				}
			};
		}
	)
);
