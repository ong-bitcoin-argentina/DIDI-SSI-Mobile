import { IssuerDescriptor } from "didi-sdk/src/model/IssuerDescriptor";
import { StoreAction } from "../StoreAction";

export type PrestadoresResponse = {
	status: string;
	data: IssuerDescriptor[];
};

interface IssuersActionRegister {
	type: "ISSUERS_DATA";
	content: IssuerDescriptor[];
}

export type IssuersAction = IssuersActionRegister;

export type IssuersRegistry = IssuerDescriptor[];

export function persistedIssuersDataReducer(state: IssuersRegistry = [], action: StoreAction): IssuersRegistry {
	switch (action.type) {
		case "ISSUERS_DATA":
			return action.content;
		default:
			return state ?? [];
	}
}