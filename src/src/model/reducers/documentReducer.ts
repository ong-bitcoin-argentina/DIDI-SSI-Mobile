import { UPortDocument } from "../data/UPortDocument";

interface DocumentActionEnsure {
	type: "DOCUMENT_ENSURE";
	content: UPortDocument;
}
interface DocumentActionDelete {
	type: "DOCUMENT_DELETE";
	content: UPortDocument;
}
export type DocumentAction = DocumentActionEnsure | DocumentActionDelete;

const defaultContent: UPortDocument[] = [];

export function documentReducer(state: UPortDocument[] | undefined, action: DocumentAction): UPortDocument[] {
	if (state === undefined) {
		return defaultContent;
	}

	function matches(doc: UPortDocument) {
		return doc.jwt === action.content.jwt;
	}
	switch (action.type) {
		case "DOCUMENT_ENSURE":
			if (state.find(matches)) {
				return state;
			} else {
				return [action.content, ...state];
			}
		case "DOCUMENT_DELETE":
			if (state.find(matches)) {
				return state.filter(matches);
			} else {
				return state;
			}
		default:
			return state;
	}
}
