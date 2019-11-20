import { createSelector } from "reselect";

import { assertUnreachable } from "../../util/assertUnreachable";

import { ValidationState } from "../../model/Identity";
import { extractSpecialCredentialData } from "../../model/SpecialCredential";

import { microCredentialSelector } from "./microCredentialSelector";

export const combinedIdentitySelector = createSelector(
	microCredentialSelector,
	st => st.persisted.identity,
	(mc, id) => {
		const identity = id;
		mc.reverse().forEach(c => {
			const special = extractSpecialCredentialData(c.content.claims);
			switch (special.type) {
				case "None":
					return;
				case "EmailData":
					identity.email = {
						state: ValidationState.Approved,
						value: special.email
					};
					return;
				case "PhoneNumberData":
					identity.cellPhone = {
						state: ValidationState.Approved,
						value: special.phoneNumber
					};
					return;
				default:
					assertUnreachable(special);
			}
		});
		return identity;
	}
);
