import { UPortDocument } from "../data/UPortDocument";

interface DocumentActionEnsure {
	type: "DOCUMENT_ENSURE";
	content: UPortDocument[];
}
interface DocumentActionDelete {
	type: "DOCUMENT_DELETE";
	content: UPortDocument;
}
interface DocumentActionDeleteAll {
	type: "DOCUMENT_DELETE_ALL";
}
export type DocumentAction = DocumentActionEnsure | DocumentActionDelete | DocumentActionDeleteAll;

const defaultContent: UPortDocument[] = [];

export function documentReducer(state: UPortDocument[] | undefined, action: DocumentAction): UPortDocument[] {
	if (state === undefined) {
		return defaultContent;
	}

	switch (action.type) {
		case "DOCUMENT_ENSURE":
			const toAdd = action.content.filter(doc => !state.find(existing => existing.jwt === doc.jwt));
			if (toAdd.length === 0) {
				return state;
			} else {
				return [...toAdd, ...state];
			}

		case "DOCUMENT_DELETE":
			return state.filter(doc => doc.jwt !== action.content.jwt);

		case "DOCUMENT_DELETE_ALL":
			return [];

		default:
			return state;
	}
}
