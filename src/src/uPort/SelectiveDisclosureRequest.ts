import { parseStructure } from "./parseMap";
import { VerifiedClaimSelector } from "./VerifiedClaimSelector";

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
	return parseStructure(
		payload,
		{ type: "SelectiveDisclosureRequest" },
		{ verifiedClaims: "verified", ownClaims: "requested", callback: "callback", issuer: "iss" }
	);
}