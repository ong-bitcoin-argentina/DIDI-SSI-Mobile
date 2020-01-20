import { DidiDocument } from "./DidiDocument";

export interface RequestDocument extends DidiDocument {
	type: "RequestDocument";

	callback: string;
	ownClaims: string[];
	verifiedClaims: string[];
}

export const RequestDocument = DidiDocument;
