import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";

const SelectiveDisclosureRequestInnerCodec = t.type({
	type: t.literal("SelectiveDisclosureRequest"),
	issuer: t.string,
	callback: t.string,
	ownClaims: t.array(t.string),
	verifiedClaims: t.array(t.string)
});
export type SelectiveDisclosureRequest = typeof SelectiveDisclosureRequestInnerCodec._A;

const SelectiveDisclosureRequestOuterCodec = t.type({
	type: t.literal("shareReq"),
	iss: t.string,
	callback: t.string,
	requested: t.union([t.array(t.string), t.undefined]),
	verified: t.union([t.array(t.string), t.undefined])
});
type SelectiveDisclosureRequestTransport = typeof SelectiveDisclosureRequestOuterCodec._A;

export const SelectiveDisclosureRequestCodec = new t.Type<
	SelectiveDisclosureRequest,
	SelectiveDisclosureRequestTransport,
	unknown
>(
	"SelectiveDisclosureRequestCodec",
	SelectiveDisclosureRequestInnerCodec.is,
	(u, c) =>
		either.chain(SelectiveDisclosureRequestOuterCodec.validate(u, c), i =>
			t.success({
				type: "SelectiveDisclosureRequest",
				issuer: i.iss,
				callback: i.callback,
				ownClaims: i.requested || [],
				verifiedClaims: i.verified || []
			})
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer,
			callback: a.callback,
			requested: a.ownClaims,
			verified: a.verifiedClaims
		};
	}
);
