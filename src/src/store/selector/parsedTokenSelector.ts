import { isRight } from "fp-ts/lib/Either";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { unverifiedParseJWT } from "../../uPort/parseJWT";
import { NormalizedStoreContent } from "../normalizedStore";

export const parsedTokenSelector = createSelector(
	(state: NormalizedStoreContent) => state.persisted.tokens,
	tokens => {
		const parsed = tokens.map(unverifiedParseJWT);
		const documents = TypedArray.flatMap(parsed, tk => (isRight(tk) ? tk.right : undefined));
		return documents.reduce(
			(acc: typeof documents, curr) => (acc.find(x => curr.jwt === x.jwt) ? acc : [...acc, curr]),
			[]
		);
	}
);
