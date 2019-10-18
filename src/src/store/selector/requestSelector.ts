import { isRight } from "fp-ts/lib/Either";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { RequestDocument } from "../../model/RequestDocument";

import { parsedTokenSelector } from "./parsedTokenSelector";

export const requestSelector = createSelector(
	parsedTokenSelector,
	tokens =>
		TypedArray.flatMap(tokens, (tk): RequestDocument | null => {
			if (isRight(tk) && tk.right.content.type === "SelectiveDisclosureRequest") {
				return tk.right as RequestDocument;
			} else {
				return null;
			}
		})
);
