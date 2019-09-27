export interface SelectiveDisclosureResponse {
	type: "SelectiveDisclosureResponse";
}

export function parseSelectiveDisclosureResponse(
	payload: any
): { error: "MISSING_FIELD"; checked: string[] } | { error: null; payload: SelectiveDisclosureResponse } {
	return { error: "MISSING_FIELD", checked: [] };
}

export function generateSelectiveDisclosureResponse() {}
