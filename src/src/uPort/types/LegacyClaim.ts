import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { JSONObject, JSONValue, JSONValueCodec } from "../../util/JSON";

import { Claim, ClaimData } from "../../model/Claim";

export function flattenClaim(rootClaim: JSONObject): { root: string; rest: ClaimData } {
	const entries = Object.entries(rootClaim);
	if (entries.length === 0) {
		return { root: "", rest: {} };
	}
	const [root, claims] = entries[0];
	const result: ClaimData = {};

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

export const LegacyClaimOuterCodec = t.record(t.string, JSONValueCodec);

type LegacyClaimTransport = typeof LegacyClaimOuterCodec._A;

export const LegacyClaimCodec = new t.Type<Claim, LegacyClaimTransport, unknown>(
	"LegacyClaimCodec",
	(x): x is Claim => x instanceof Claim,
	(u, c) =>
		either.chain(LegacyClaimOuterCodec.validate(u, c), i => {
			const { root, rest } = flattenClaim(i);
			return t.success<Claim>(new Claim(root, rest, undefined));
		}),
	a => ({
		[a.title]: a.data
	})
);
