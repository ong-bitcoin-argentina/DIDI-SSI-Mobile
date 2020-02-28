import { createSelector } from "reselect";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const newTokensAvailableSelector = createSelector(
	parsedTokenSelector,
	state => state.persisted.seenTokens,
	(tokens, seen) => tokens.find(tk => !seen.includes(tk.jwt)) !== undefined
);
