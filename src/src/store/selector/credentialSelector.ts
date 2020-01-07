import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { CredentialDocument } from "../../model/CredentialDocument";
import { SpecialCredentialFlag } from "../../model/SpecialCredential";

import { parsedTokenSelector } from "./parsedTokenSelector";

const allCredentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);

export const toplevelCredentialSelector = createSelector(allCredentialSelector, credentials => {
	const nested = credentials.map(c => c.nested).reduce((acc, next) => acc.concat(next), []);
	const res = credentials.filter(credential => !nested.find(nest => nest.jwt === credential.jwt));
	return res.sort((l, r) => {
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
});

export type SpecialCredentialMap = Partial<Record<NonNullable<SpecialCredentialFlag>["type"], CredentialDocument>>;

export const activeSpecialCredentialsSelector = createSelector(toplevelCredentialSelector, credentials => {
	const result: SpecialCredentialMap = {};
	credentials
		.slice()
		.reverse()
		.forEach(credential => {
			if (credential.specialFlag) {
				result[credential.specialFlag.type] = credential;
			}
		});
	return result;
});
