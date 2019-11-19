import { createSelector } from "reselect";

import { assertUnreachable } from "../../util/assertUnreachable";

import { Identity, ValidationState } from "../../model/Identity";
import { extractSpecialCredentialData } from "../../model/SpecialCredential";
import { sampleIdentity } from "../samples/sampleIdentity";

import { microCredentialSelector } from "./microCredentialSelector";

export const combinedIdentitySelector = createSelector(microCredentialSelector, mc => {
	const identity: Identity = sampleIdentity;
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
});
