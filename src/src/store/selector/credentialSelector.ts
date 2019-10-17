import { createSelector } from "reselect";

import { microCredentialSelector } from "./microCredentialSelector";
import { deriveCredentials } from "../../model/DerivedCredential";

export const credentialSelector = createSelector(
	microCredentialSelector,
	mc => deriveCredentials(mc)
);
