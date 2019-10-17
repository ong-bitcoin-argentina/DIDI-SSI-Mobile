import * as t from "io-ts";
import { JSONValueCodec, JSONValue } from "../../util/JSON";

export const ClaimCodec = t.record(t.string, JSONValueCodec);

export type Claim = typeof ClaimCodec._A;

export type FlattenedClaim = Record<string, string>;

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
