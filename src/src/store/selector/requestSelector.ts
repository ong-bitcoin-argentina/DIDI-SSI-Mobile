import { createSelector } from "reselect";

import { parsedTokenSelector } from "./parsedTokenSelector";
import { isRight } from "fp-ts/lib/Either";
import TypedArray from "../../util/TypedArray";
import { RequestDocument } from "../../model/RequestDocument";

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
