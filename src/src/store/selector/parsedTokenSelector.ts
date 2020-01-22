import { unverifiedParseJWT } from "didi-sdk";
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
			doc.type === "CredentialDocument" || doc.type === "RequestDocument" ? doc : undefined
		);
		return persistentDocuments.reduce(
			(acc: typeof persistentDocuments, curr) => (acc.find(x => curr.jwt === x.jwt) ? acc : [...acc, curr]),
			[]
		);
	}
);
