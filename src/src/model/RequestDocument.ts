import { DidiDocument } from "./DidiDocument";

export interface RequestDocument extends DidiDocument {
	type: "RequestDocument";

	callback: string;
	ownClaims: string[];
	verifiedClaims: string[];
}

export const RequestDocument = {
	isValidAt: (document: RequestDocument, date: Date): boolean => {
		const timestamp = date.getTime() / 1000;
		if (document.expireAt && document.expireAt < timestamp) {
			return false;
		}
		if (document.issuedAt && timestamp < document.issuedAt) {
			return false;
		}
		return true;
	},
	isValidNow: (document: RequestDocument): boolean => {
		return RequestDocument.isValidAt(document, new Date());
	}
};
