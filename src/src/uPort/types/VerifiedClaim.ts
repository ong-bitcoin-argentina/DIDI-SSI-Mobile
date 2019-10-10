import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { ClaimCodec } from "./Claim";

export const VerifiedClaimInnerCodec = t.type({
	type: t.literal("VerifiedClaim"),
	issuer: t.string,
	subject: t.string,
	claims: ClaimCodec
});
export type VerifiedClaim = typeof VerifiedClaimInnerCodec._A;

const VerifiedClaimOuterCodec = t.type({
	iss: t.string,
	sub: t.string,
	vc: t.type({
		"@context": t.array(t.string),
		type: t.array(t.string),
		credentialSubject: ClaimCodec
	})
});
type VerifiedClaimTransport = typeof VerifiedClaimOuterCodec._A;

export const VerifiedClaimCodec = new t.Type<VerifiedClaim, VerifiedClaimTransport, unknown>(
	"VerifiedClaimCodec",
	VerifiedClaimInnerCodec.is,
	(u, c) =>
		either.chain(VerifiedClaimOuterCodec.validate(u, c), i =>
			t.success({ type: "VerifiedClaim", issuer: i.iss, subject: i.sub, claims: i.vc.credentialSubject })
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer,
			sub: a.subject,
			vc: {
				"@context": ["https://www.w3.org/2018/credentials/v1"],
				type: ["VerifiableCredential"],
				credentialSubject: a.claims
			}
		};
	}
);
