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

	switch (action.type) {
		case "DOCUMENT_ENSURE":
			return [action.content, ...state];
		case "DOCUMENT_DELETE":
			return [];
		default:
			return state;
	}
}
