import { Right } from "fp-ts/lib/Either";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { Claim } from "../../model/Claim";
import { CredentialDocument } from "../../model/CredentialDocument";
import { EthrDID } from "../../model/EthrDID";
import { SpecialCredentialFlag } from "../../model/SpecialCredential";

import { parsedTokenSelector } from "./parsedTokenSelector";

const allCredentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);

const toplevelCredentialSelector = createSelector(allCredentialSelector, credentials => {
	const nested = credentials.map(c => c.nested).reduce((acc, next) => acc.concat(next), []);
	const res = credentials.filter(credential => !nested.find(nest => nest.jwt === credential.jwt));
	return res;
});

export interface SpecialCredentialData extends CredentialDocument {
	specialFlag: SpecialCredentialFlag;
}

interface CategorizedCredentials {
	regular: CredentialDocument[];
	special: SpecialCredentialData[];
}

const categorizedCredentialSelector = createSelector(
	toplevelCredentialSelector,
	(credentials): CategorizedCredentials => {
		const res: CategorizedCredentials = {
			regular: [],
			special: []
		};
		credentials.forEach(credential => {
			const specialFlag = SpecialCredentialFlag.extract(credential.content.claims);
			if (specialFlag === undefined) {
				res.regular.push(credential);
			} else {
				res.special.push({
					...credential,
					specialFlag
				});
			}
		});
		return res;
	}
);

export const regularCredentialSelector = createSelector(
	categorizedCredentialSelector,
	categorized => categorized.regular
);

export const specialCredentialSelector = createSelector(
	categorizedCredentialSelector,
	categorized => categorized.special
);

export const mixedCredentialSelector = createSelector(categorizedCredentialSelector, categorized => [
	...categorized.regular,
	...categorized.special
]);
