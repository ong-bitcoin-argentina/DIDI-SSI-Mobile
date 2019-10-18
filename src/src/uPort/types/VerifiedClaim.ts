import { either, Right } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { ClaimCodec } from "./Claim";

export const VerifiedClaimInnerCodec = t.intersection([
	t.type({
		type: t.literal("VerifiedClaim"),
		issuer: t.string,
		subject: t.string,
		claims: ClaimCodec
	}),
	t.partial({
		issuedAt: t.number,
		expireAt: t.number
	})
]);
export type VerifiedClaim = typeof VerifiedClaimInnerCodec._A;

export type ClaimMetadata = Omit<VerifiedClaim, "type" | "claims">;

const VerifiedClaimOuterCodec = t.intersection([
	t.type({
		iss: t.string,
		sub: t.string,
		vc: t.type({
			"@context": t.array(t.string),
			type: t.array(t.string),
			credentialSubject: ClaimCodec
		})
	}),
	t.partial({
		iat: t.number,
		exp: t.number
	})
]);
type VerifiedClaimTransport = typeof VerifiedClaimOuterCodec._A;

export const VerifiedClaimCodec = new t.Type<VerifiedClaim, VerifiedClaimTransport, unknown>(
	"VerifiedClaimCodec",
	VerifiedClaimInnerCodec.is,
	(u, c) =>
		either.chain(VerifiedClaimOuterCodec.validate(u, c), i =>
			t.success<VerifiedClaim>({
				type: "VerifiedClaim",
				issuer: i.iss,
				subject: i.sub,
				claims: i.vc.credentialSubject,
				expireAt: i.exp,
				issuedAt: i.iat
			})
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer,
			sub: a.subject,
			exp: a.expireAt,
			iat: a.issuedAt,
			vc: {
				"@context": ["https://www.w3.org/2018/credentials/v1"],
				type: ["VerifiableCredential"],
				credentialSubject: a.claims
			}
		};
	}
);
