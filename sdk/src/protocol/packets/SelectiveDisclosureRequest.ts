import * as t from "io-ts";

import { EthrDID } from "../../model/EthrDID";

const SelectiveDisclosureRequestInnerCodec = t.intersection(
	[
		t.type(
			{
				type: t.literal("SelectiveDisclosureRequest"),
				issuer: EthrDID.codec,
				callback: t.string,
				ownClaims: t.array(t.string),
				verifiedClaims: t.array(t.string)
			},
			""
		),
		t.partial(
			{
				issuedAt: t.number,
				expireAt: t.number
			},
			""
		)
	],
	""
);
export type SelectiveDisclosureRequest = typeof SelectiveDisclosureRequestInnerCodec._A;

const SelectiveDisclosureRequestOuterCodec = t.intersection([
	t.type(
		{
			type: t.literal("shareReq"),
			iss: EthrDID.codec,
			callback: t.string
		},
		"SelectiveDisclosureRequest"
	),
	t.partial(
		{
			requested: t.array(t.string),
			verified: t.array(t.string),
			iat: t.number,
			exp: t.number
		},
		"SelectiveDisclosureRequest"
	)
]);
type SelectiveDisclosureRequestTransport = typeof SelectiveDisclosureRequestOuterCodec._A;

export const SelectiveDisclosureRequestCodec = SelectiveDisclosureRequestOuterCodec.pipe(
	new t.Type<SelectiveDisclosureRequest, SelectiveDisclosureRequestTransport, SelectiveDisclosureRequestTransport>(
		"SelectiveDisclosureRequest_In",
		SelectiveDisclosureRequestInnerCodec.is,
		(i, c) =>
			t.success<SelectiveDisclosureRequest>({
				type: "SelectiveDisclosureRequest",
				issuer: i.iss,
				callback: i.callback,
				ownClaims: i.requested || [],
				verifiedClaims: i.verified || [],
				issuedAt: i.iat,
				expireAt: i.exp
			}),
		a => {
			return {
				type: "shareReq",
				iss: a.issuer,
				callback: a.callback,
				requested: a.ownClaims,
				verified: a.verifiedClaims,
				iat: a.issuedAt,
				exp: a.expireAt
			};
		}
	),
	"___"
);
