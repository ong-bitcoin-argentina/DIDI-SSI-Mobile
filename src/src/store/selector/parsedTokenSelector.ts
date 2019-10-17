import { createSelector } from "reselect";
import { either } from "fp-ts/lib/Either";

import { NormalizedStoreContent } from "../normalizedStore";
import { unverifiedParseJWT } from "../../uPort/parseJWT";
import { CredentialDocument } from "../../model/CredentialDocument";
import { RequestDocument } from "../../model/RequestDocument";

export const parsedTokenSelector = createSelector(
	(state: NormalizedStoreContent) => state.tokens,
	tokens =>
		tokens.map(jwt => {
			const parse = unverifiedParseJWT(jwt);
			return either.map(parse, (content): RequestDocument | CredentialDocument => {
				switch (content.type) {
					case "VerifiedClaim":
						return { jwt, content };
					case "SelectiveDisclosureRequest":
						return { jwt, content };
				}
			});
		})
);
