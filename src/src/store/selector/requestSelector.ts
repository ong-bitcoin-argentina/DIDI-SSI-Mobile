import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { RequestDocument } from "../../model/RequestDocument";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const requestSelector = createSelector(
	parsedTokenSelector,
	tokens => TypedArray.flatMap(tokens, (tk): RequestDocument | null => (tk.type === "RequestDocument" ? tk : null))
);
