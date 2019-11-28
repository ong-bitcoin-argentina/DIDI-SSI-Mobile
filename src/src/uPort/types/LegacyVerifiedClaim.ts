import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { EthrDIDCodec } from "./EthrDID";
import { LegacyClaimCodec } from "./LegacyClaim";
import { VerifiedClaim, VerifiedClaimInnerCodec } from "./VerifiedClaim";

const LegacyVerifiedClaimOuterCodec = t.intersection([
	t.type({
		iss: t.string,
		sub: t.string,
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
			either.chain(EthrDIDCodec.validate(i.iss, c), issuer =>
				either.chain(EthrDIDCodec.validate(i.sub, c), subject =>
					t.success<VerifiedClaim>({
						type: "VerifiedClaim",
						issuer,
						subject,
						claims: i.claim,
						expireAt: i.exp,
						issuedAt: i.iat
					})
				)
			)
		),
	a => {
		return {
			type: "shareReq",
			iss: a.issuer.did(),
			sub: a.subject.did(),
			exp: a.expireAt,
			iat: a.issuedAt,
			claim: a.claims
		};
	}
);
