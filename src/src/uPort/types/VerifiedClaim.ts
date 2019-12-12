import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { EthrDIDCodec } from "../../model/EthrDID";

import { LegacyClaimCodec } from "./LegacyClaim";
import { StructuredClaimCodec } from "./StructuredClaim";

export const VerifiedClaimInnerCodec = t.intersection([
	t.type({
		type: t.literal("VerifiedClaim"),
		issuer: EthrDIDCodec,
		subject: EthrDIDCodec,
		claims: StructuredClaimCodec
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
		iss: EthrDIDCodec,
		sub: EthrDIDCodec,
		vc: t.type({
			"@context": t.array(t.string),
			type: t.array(t.string),
			credentialSubject: t.union([StructuredClaimCodec, LegacyClaimCodec])
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
