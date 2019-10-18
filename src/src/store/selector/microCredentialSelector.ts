import { isRight } from "fp-ts/lib/Either";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { CredentialDocument } from "../../model/CredentialDocument";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const microCredentialSelector = createSelector(
	parsedTokenSelector,
	tokens =>
		TypedArray.flatMap(tokens, (tk): CredentialDocument | null => {
			if (isRight(tk) && tk.right.content.type === "VerifiedClaim") {
				return tk.right as CredentialDocument;
			} else {
				return null;
			}
		})
);
