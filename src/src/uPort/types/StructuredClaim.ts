import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import TypedObject from "../../util/TypedObject";

import { Claim, ClaimDataCodec } from "./Claim";

export const StructuredClaimOuterCodec = t.record(
	t.string,
	t.intersection([
		t.type({
			data: ClaimDataCodec
		}),
		t.partial({
			preview: t.type({
				type: t.number,
				fields: t.array(t.string)
			})
		})
	])
);
type StructuredClaimTransport = typeof StructuredClaimOuterCodec._A;

export const StructuredClaimCodec = new t.Type<Claim, StructuredClaimTransport, unknown>(
	"StructuredClaimCodec",
	(x): x is Claim => x instanceof Claim,
	(u, c) =>
		either.chain(StructuredClaimOuterCodec.validate(u, c), i => {
			const keys = TypedObject.keys(i);
			if (keys.length !== 1) {
				return t.failure(i, c);
			}
			const key = keys[0];
			const value = i[key];
			return t.success<Claim>(new Claim(key, value.data, value.preview));
		}),
	a => {
		return {
			[a.title]: {
				data: a.data,
				preview: a.preview
			}
		};
	}
);
