import TypedArray from "../util/TypedArray";

import { VerifiedClaim } from "../uPort/types/VerifiedClaim";

import { ClaimDataPairs } from "./Claim";

export interface CredentialDocument {
	type: "CredentialDocument";
	jwt: string;
	content: VerifiedClaim;
	nested: CredentialDocument[];
}

export const CredentialDocument = {
	extractAllDataPairs: (doc: CredentialDocument): ClaimDataPairs => {
		return [
			...doc.nested.map(CredentialDocument.extractAllDataPairs).reduce((l, r) => [...l, ...r], []),
			...doc.content.claims.dataPairs()
		];
	},

	extractDataPairs: (doc: CredentialDocument, preview?: { type: number; fields: string[] }): ClaimDataPairs => {
		const dataPairs = CredentialDocument.extractAllDataPairs(doc);
		if (!preview) {
			return dataPairs;
		}
		return TypedArray.flatMap(preview.fields, label => dataPairs.find(pair => pair.label === label));
	}
};
