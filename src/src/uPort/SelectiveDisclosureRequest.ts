export interface VerifiedClaimSelector {
	name: string;
	issuer?: string;
}

export interface SelectiveDisclosureRequest {
	type: "SelectiveDisclosureRequest";
	issuer: string;
	callback: string;
	ownClaims: string[];
	verifiedClaims: VerifiedClaimSelector[];
}

export function parseSelectiveDisclosureRequest(
	payload: any
): { error: "MISSING_FIELD"; checked: string[] } | { error: null; payload: SelectiveDisclosureRequest } {
	return { error: "MISSING_FIELD", checked: [] };
}
