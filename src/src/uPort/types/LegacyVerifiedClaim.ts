import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { ClaimCodec } from "./Claim";
import { VerifiedClaim, VerifiedClaimInnerCodec } from "./VerifiedClaim";

const LegacyVerifiedClaimOuterCodec = t.type({
	iss: t.string,
	sub: t.string,
	claim: ClaimCodec
});
type LegacyVerifiedClaimTransport = typeof LegacyVerifiedClaimOuterCodec._A;

export const LegacyVerifiedClaimCodec = new t.Type<VerifiedClaim, LegacyVerifiedClaimTransport, unknown>(
	"LegacyVerifiedClaimCodec",
	VerifiedClaimInnerCodec.is,
	(u, c) =>
		either.chain(LegacyVerifiedClaimOuterCodec.validate(u, c), i =>
			t.success({ type: "VerifiedClaim", issuer: i.iss, subject: i.sub, claims: i.claim })
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer,
			sub: a.subject,
			claim: a.claims
		};
	}
);
