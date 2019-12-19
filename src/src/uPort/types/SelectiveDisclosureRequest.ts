import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { EthrDIDCodec } from "../../model/EthrDID";

const SelectiveDisclosureRequestInnerCodec = t.intersection([
	t.type({
		type: t.literal("SelectiveDisclosureRequest"),
		issuer: EthrDIDCodec,
		callback: t.string,
		ownClaims: t.array(t.string),
		verifiedClaims: t.array(t.string)
	}),
	t.partial({
		issuedAt: t.number,
		expireAt: t.number
	})
]);
export type SelectiveDisclosureRequest = typeof SelectiveDisclosureRequestInnerCodec._A;

const SelectiveDisclosureRequestOuterCodec = t.intersection([
	t.type({
		type: t.literal("shareReq"),
		iss: EthrDIDCodec,
		callback: t.string
	}),
	t.partial({
		requested: t.array(t.string),
		verified: t.array(t.string),
		iat: t.number,
		exp: t.number
	})
]);
type SelectiveDisclosureRequestTransport = typeof SelectiveDisclosureRequestOuterCodec._O;

export const SelectiveDisclosureRequestCodec = new t.Type<
	SelectiveDisclosureRequest,
	SelectiveDisclosureRequestTransport,
	unknown
>(
	"SelectiveDisclosureRequestCodec",
	SelectiveDisclosureRequestInnerCodec.is,
	(u, c) =>
		either.chain(SelectiveDisclosureRequestOuterCodec.validate(u, c), i =>
			t.success<SelectiveDisclosureRequest>({
				type: "SelectiveDisclosureRequest",
				issuer: i.iss,
				callback: i.callback,
				ownClaims: i.requested || [],
				verifiedClaims: i.verified || [],
				issuedAt: i.iat,
				expireAt: i.exp
			})
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer.did(),
			callback: a.callback,
			requested: a.ownClaims,
			verified: a.verifiedClaims,
			iat: a.issuedAt,
			exp: a.expireAt
		};
	}
);
