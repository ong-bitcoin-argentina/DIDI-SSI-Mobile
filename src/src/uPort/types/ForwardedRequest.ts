import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { EthrDIDCodec } from "../../model/EthrDID";

const ForwardedRequestInnerCodec = t.intersection([
	t.type({
		type: t.literal("ForwardedRequest"),
		issuer: EthrDIDCodec,
		subject: EthrDIDCodec,
		forwarded: t.string
	}),
	t.partial({
		issuedAt: t.number,
		expireAt: t.number
	})
]);
export type ForwardedRequest = typeof ForwardedRequestInnerCodec._A;

const ForwardedRequestOuterCodec = t.intersection([
	t.type({
		iss: EthrDIDCodec,
		sub: EthrDIDCodec,
		disclosureRequest: t.string
	}),
	t.partial({
		iat: t.number,
		exp: t.number
	})
]);
type ForwardedRequestTransport = typeof ForwardedRequestOuterCodec._O;

export const ForwardedRequestCodec = new t.Type<ForwardedRequest, ForwardedRequestTransport, unknown>(
	"ForwardedRequestCodec",
	ForwardedRequestInnerCodec.is,
	(u, c) =>
		either.chain(ForwardedRequestOuterCodec.validate(u, c), i =>
			t.success<ForwardedRequest>({
				type: "ForwardedRequest",
				issuer: i.iss,
				subject: i.sub,
				expireAt: i.exp,
				issuedAt: i.iat,
				forwarded: i.disclosureRequest
			})
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer.did(),
			sub: a.subject.did(),
			exp: a.expireAt,
			iat: a.issuedAt,
			disclosureRequest: a.forwarded
		};
	}
);
