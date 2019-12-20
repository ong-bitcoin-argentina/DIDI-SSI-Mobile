import TypedArray from "../util/TypedArray";

import { Claim, ClaimDataPairs } from "./Claim";
import { DidiDocument } from "./DidiDocument";
import { EthrDID } from "./EthrDID";

export interface CredentialDocument extends DidiDocument {
	type: "CredentialDocument";

	claims: Claim;
	subject: EthrDID;
	nested: CredentialDocument[];
}

export const CredentialDocument = {
	extractAllDataPairs: (doc: CredentialDocument): ClaimDataPairs => {
		return [
			...doc.nested.map(CredentialDocument.extractAllDataPairs).reduce((l, r) => [...l, ...r], []),
			...doc.claims.dataPairs()
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
