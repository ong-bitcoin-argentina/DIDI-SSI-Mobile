import { parseStructure } from "./parseMap";

export interface SelectiveDisclosureResponse {
	type: "SelectiveDisclosureResponse";
}

export function parseSelectiveDisclosureResponse(
	payload: any
): { error: "MISSING_FIELD"; checked: string[] } | { error: null; payload: SelectiveDisclosureResponse } {
	return parseStructure(payload, { type: "SelectiveDisclosureResponse" }, {});
}

export function generateSelectiveDisclosureResponse() {}
