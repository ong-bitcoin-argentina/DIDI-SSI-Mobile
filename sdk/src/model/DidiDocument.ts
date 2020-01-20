import { EthrDID } from "./EthrDID";

export interface DidiDocument {
	jwt: string;
	issuer: EthrDID;
	issuedAt?: number;
	expireAt?: number;
}

export const DidiDocument = {
	isValidAt: (document: DidiDocument, date: Date): boolean => {
		const timestamp = date.getTime() / 1000;
		if (document.expireAt && document.expireAt < timestamp) {
			return false;
		}
		if (document.issuedAt && timestamp < document.issuedAt) {
			return false;
		}
		return true;
	},
	isValidNow: (document: DidiDocument): boolean => {
		return DidiDocument.isValidAt(document, new Date());
	}
};
