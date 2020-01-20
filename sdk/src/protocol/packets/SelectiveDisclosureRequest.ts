import * as t from "io-ts";

import TypedObject from "../../util/TypedObject";

import { EthrDID } from "../../model/EthrDID";

const VerifiableSpecCodec = t.partial({
	essential: t.boolean,
	iss: t.array(t.intersection([t.type({ did: EthrDID.codec }, ""), t.partial({ url: t.string }, "")], "")),
	reason: t.string
});
export type VerifiableSpecIssuerSelector = typeof VerifiableSpecCodec._A["iss"];

const UserInfoSpecCodec = t.partial({
	essential: t.boolean,
	reason: t.string
});

const SelectiveDisclosureRequestInnerCodec = t.intersection(
	[
		t.type(
			{
				type: t.literal("SelectiveDisclosureRequest"),
				issuer: EthrDID.codec,
				callback: t.string,
				verifiedClaims: t.record(t.string, VerifiableSpecCodec),
				ownClaims: t.record(t.string, UserInfoSpecCodec)
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
			claims: t.partial({
				verifiable: t.record(t.string, t.union([t.null, VerifiableSpecCodec])),
				user_info: t.record(t.string, t.union([t.null, UserInfoSpecCodec]))
			}),
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
				ownClaims: {
					...TypedObject.fromEntries((i.requested ?? []).map(req => [req, {}])),
					...TypedObject.mapValues(i.claims?.user_info ?? {}, value => (value === null ? {} : value))
				},
				verifiedClaims: {
					...TypedObject.fromEntries((i.verified ?? []).map(req => [req, {}])),
					...TypedObject.mapValues(i.claims?.verifiable ?? {}, value => (value === null ? {} : value))
				},
				issuedAt: i.iat,
				expireAt: i.exp
			}),
		a => {
			return {
				type: "shareReq",
				iss: a.issuer,
				callback: a.callback,
				claims: {
					verifiable: a.verifiedClaims,
					user_info: a.ownClaims
				},
				iat: a.issuedAt,
				exp: a.expireAt
			};
		}
	),
	"___"
);
