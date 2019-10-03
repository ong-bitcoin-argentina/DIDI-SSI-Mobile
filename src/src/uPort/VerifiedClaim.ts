import * as t from "io-ts";
import { either } from "fp-ts/lib/Either";
import { JSONValue, JSONValueCodec } from "../util/JSON";

const ClaimCodec = t.record(t.string, JSONValueCodec);
export type Claim = typeof ClaimCodec._A;

const VerifiedClaimInnerCodec = t.type({
	type: t.literal("VerifiedClaim"),
	issuer: t.string,
	subject: t.string,
	claims: ClaimCodec
});
export type VerifiedClaim = typeof VerifiedClaimInnerCodec._A;

const VerifiedClaimOuterCodec = t.type({
	iss: t.string,
	sub: t.string,
	claim: ClaimCodec
});
type VerifiedClaimTransport = typeof VerifiedClaimOuterCodec._A;

export const VerifiedClaimCodec = new t.Type<VerifiedClaim, VerifiedClaimTransport, unknown>(
	"VerifiedClaimCodec",
	VerifiedClaimInnerCodec.is,
	(u, c) =>
		either.chain(VerifiedClaimOuterCodec.validate(u, c), i =>
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

type FlattenedClaim = Record<string, string>;

export function flattenClaim(rootClaim: Claim): { root: string; rest: FlattenedClaim } {
	const entries = Object.entries(rootClaim);
	if (entries.length === 0) {
		return { root: "", rest: {} };
	}
	const [root, claims] = entries[0];
	const result: FlattenedClaim = {};

	function doFlatten(claim: JSONValue, path?: string) {
		if (claim instanceof Array) {
			claim.forEach(subclaim => doFlatten(subclaim, path));
		} else if (claim && typeof claim === "object") {
			Object.entries(claim).forEach(([key, value]) => {
				doFlatten(value, path ? `${path}.${key}` : key);
			});
		} else if (claim) {
			result[path || ""] = claim.toString();
		}
	}

	doFlatten(claims);
	return { root, rest: result };
}
