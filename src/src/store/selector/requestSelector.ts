import { RequestDocument } from "didi-sdk";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const requestSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): RequestDocument | null => (tk.type === "RequestDocument" ? tk : null))
);
