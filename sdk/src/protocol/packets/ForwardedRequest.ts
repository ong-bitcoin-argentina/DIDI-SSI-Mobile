import * as t from "io-ts";

import { EthrDID } from "../../model/EthrDID";

const ForwardedRequestInnerCodec = t.intersection([
	t.type({
		type: t.literal("ForwardedRequest"),
		issuer: EthrDID.codec,
		subject: EthrDID.codec,
		forwarded: t.string
	}),
	t.partial({
		issuedAt: t.number,
		expireAt: t.number
	})
]);
export type ForwardedRequest = typeof ForwardedRequestInnerCodec._A;

const ForwardedRequestOuterCodec = t.intersection([
	t.type(
		{
			iss: EthrDID.codec,
			sub: EthrDID.codec,
			disclosureRequest: t.string
		},
		"ForwardedRequest"
	),
	t.partial(
		{
			iat: t.number,
			exp: t.number
		},
		"ForwardedRequest"
	)
]);
type ForwardedRequestTransport = typeof ForwardedRequestOuterCodec._A;

export const ForwardedRequestCodec = ForwardedRequestOuterCodec.pipe(
	new t.Type<ForwardedRequest, ForwardedRequestTransport, ForwardedRequestTransport>(
		"ForwardedRequest_In",
		ForwardedRequestInnerCodec.is,
		(i, c) =>
			t.success<ForwardedRequest>({
				type: "ForwardedRequest",
				issuer: i.iss,
				subject: i.sub,
				expireAt: i.exp,
				issuedAt: i.iat,
				forwarded: i.disclosureRequest
			}),
		a => {
			return {
				type: "shareReq",
				iss: a.issuer,
				sub: a.subject,
				exp: a.expireAt,
				iat: a.issuedAt,
				disclosureRequest: a.forwarded
			};
		}
	),
	"___"
);
