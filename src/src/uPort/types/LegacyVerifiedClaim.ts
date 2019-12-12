import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { EthrDIDCodec } from "../../model/EthrDID";

import { LegacyClaimCodec } from "./LegacyClaim";
import { VerifiedClaim, VerifiedClaimInnerCodec } from "./VerifiedClaim";

const LegacyVerifiedClaimOuterCodec = t.intersection([
	t.type({
		iss: EthrDIDCodec,
		sub: EthrDIDCodec,
		claim: LegacyClaimCodec
	}),
	t.partial({
		iat: t.number,
		exp: t.number
	})
]);
type LegacyVerifiedClaimTransport = typeof LegacyVerifiedClaimOuterCodec._A;

export const LegacyVerifiedClaimCodec = new t.Type<VerifiedClaim, LegacyVerifiedClaimTransport, unknown>(
	"LegacyVerifiedClaimCodec",
	VerifiedClaimInnerCodec.is,
	(u, c) =>
		either.chain(LegacyVerifiedClaimOuterCodec.validate(u, c), i =>
			t.success<VerifiedClaim>({
				type: "VerifiedClaim",
				issuer: i.iss,
				subject: i.sub,
				claims: i.claim,
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
			claim: a.claims
		};
	}
);
