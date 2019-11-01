import { createSelector } from "reselect";

import { deriveCredentials } from "../../model/DerivedCredential";

import { microCredentialSelector } from "./microCredentialSelector";

export const credentialSelector = createSelector(
	microCredentialSelector,
	mc => deriveCredentials(mc)
);
