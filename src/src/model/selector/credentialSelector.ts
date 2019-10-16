import { createSelector } from "reselect";

import { parsedTokenSelector } from "./parsedTokenSelector";
import { isRight } from "fp-ts/lib/Either";
import TypedArray from "../../util/TypedArray";
import { CredentialDocument } from "../data/CredentialDocument";

export const credentialSelector = createSelector(
	parsedTokenSelector,
	tokens => TypedArray.flatMap(tokens, (tk): CredentialDocument | null => {
		if (isRight(tk) && tk.right.content.type === "VerifiedClaim") {
			return tk.right as CredentialDocument
		} else {
			return null
		}
	})
);