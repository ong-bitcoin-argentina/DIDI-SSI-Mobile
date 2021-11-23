import { unverifiedParseJWT } from "@proyecto-didi/app-sdk";
import { array } from "fp-ts/lib/Array";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { NormalizedStoreContent } from "../normalizedStore";

export const parsedTokenSelector = createSelector(
	(state: NormalizedStoreContent) => state.persisted.tokens,
	tokens => {
		const parsed = tokens.map(unverifiedParseJWT);
		const { right: documents } = array.separate(parsed);
		const persistentDocuments = TypedArray.flatMap(documents, doc =>
			doc.type === "CredentialDocument" || doc.type === "SelectiveDisclosureRequest" ? doc : undefined
		);
		return TypedArray.uniqueElements(persistentDocuments, (l, r) => l.jwt === r.jwt).sort((l, r) => {
			if (l.issuedAt) {
				if (r.issuedAt) {
					return r.issuedAt - l.issuedAt;
				} else {
					return +1;
				}
			} else {
				return -1;
			}
		});
	}
);
