import { createSelector } from "reselect";

import { unverifiedParseJWT } from "../../uPort/parseJWT";
import { NormalizedStoreContent } from "../normalizedStore";

export const parsedTokenSelector = createSelector(
	(state: NormalizedStoreContent) => state.tokens,
	tokens => tokens.map(unverifiedParseJWT)
);
