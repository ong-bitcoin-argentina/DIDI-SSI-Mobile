type Claim = { [name: string]: Claim | string };

export interface VerifiedClaim {
	type: "VerifiedClaim";
	issuer: string;
	subject: string;
	claims: Claim;
}

export function parseVerifiedClaim(
	payload: any
): { error: "MISSING_FIELD"; checked: string[] } | { error: null; payload: VerifiedClaim } {
	const map = {
		issuer: "iss",
		subject: "sub",
		claims: "claim"
	};

	const result: { [name: string]: any } = {
		type: "VerifiedClaim"
	};
	const missingFields: string[] = [];

	Object.entries(map).forEach(([target, source]) => {
		if (payload[source]) {
			result[target] = payload[source];
		} else {
			missingFields.push(source);
		}
	});

	if (missingFields.length === 0) {
		return { error: null, payload: result as VerifiedClaim };
	} else {
		return { error: "MISSING_FIELD", checked: missingFields };
	}
}

type FlattenedClaim = { [name: string]: string };

export function flattenClaim(rootClaim: Claim): { root: string; rest: FlattenedClaim } {
	const entries = Object.entries(rootClaim);
	if (entries.length === 0) {
		return { root: "", rest: {} };
	}
	const [root, claims] = entries[0];
	const result: FlattenedClaim = {};

	function doFlatten(claim: string | Claim, path?: string) {
		if (typeof claim === "string") {
			result[path || ""] = claim;
		} else {
			Object.entries(claim).forEach(([key, value]) => {
				doFlatten(value, path ? `${path}.${key}` : key);
			});
		}
	}

	doFlatten(claims);
	return { root, rest: result };
}
