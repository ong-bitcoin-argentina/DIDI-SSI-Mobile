import { Right } from "fp-ts/lib/Either";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { Claim } from "../../model/Claim";
import { CredentialDocument } from "../../model/CredentialDocument";
import { EthrDID } from "../../model/EthrDID";

import { parsedTokenSelector } from "./parsedTokenSelector";

const allCredentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);

export const credentialSelector = createSelector(allCredentialSelector, credentials => {
	const nested = credentials.map(c => c.nested).reduce((acc, next) => acc.concat(next), []);
	const res = credentials.filter(credential => !nested.find(nest => nest.jwt === credential.jwt));
	return res;
});
