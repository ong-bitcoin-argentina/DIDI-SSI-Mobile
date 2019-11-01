import { SelectiveDisclosureRequest } from "../uPort/types/SelectiveDisclosureRequest";

export interface RequestDocument {
	type: "RequestDocument";
	jwt: string;
	content: SelectiveDisclosureRequest;
}

export const RequestDocument = {
	isValidAt: (document: RequestDocument, date: Date): boolean => {
		const timestamp = date.getTime() / 1000;
		if (document.content.expireAt && document.content.expireAt < timestamp) {
			return false;
		}
		if (document.content.issuedAt && timestamp < document.content.issuedAt) {
			return false;
		}
		return true;
	},
	isValidNow: (document: RequestDocument): boolean => {
		return RequestDocument.isValidAt(document, new Date());
	}
};
