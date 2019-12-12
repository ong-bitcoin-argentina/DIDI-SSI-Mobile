import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { CredentialDocument } from "../../model/CredentialDocument";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const credentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);
