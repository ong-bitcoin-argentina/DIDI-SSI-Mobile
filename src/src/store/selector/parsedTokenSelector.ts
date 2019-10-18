import { createSelector } from "reselect";

import { NormalizedStoreContent } from "../normalizedStore";
import { unverifiedParseJWT } from "../../uPort/parseJWT";

export const parsedTokenSelector = createSelector(
	(state: NormalizedStoreContent) => state.tokens,
	tokens => tokens.map(unverifiedParseJWT)
);
