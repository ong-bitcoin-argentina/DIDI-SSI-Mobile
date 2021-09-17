import { IssuerDescriptor, IssuersDescriptor } from "didi-sdk/src/model/IssuerDescriptor";
import { DocumentDirectoryPath, downloadFile, readFile } from "react-native-fs";
import { StoreAction } from "../StoreAction";

interface IssuersActionRegister {
	type: "ISSUERS_DATA";
	content: IssuersDescriptor;
}

const initialValue = {
	issuersList: [],
	totalPages: 0,
};

export type IssuersAction = IssuersActionRegister;

export type IssuersRegistry = IssuersDescriptor;

export function persistedIssuersDataReducer(state: IssuersRegistry = initialValue, action: StoreAction): IssuersRegistry {
	switch (action.type) {
		case "ISSUERS_DATA": {
			const issuersData = {
				issuersList: [] as any,
				totalPages: action.content.totalPages,
			}
			action.content.issuersList.forEach(async descriptor => {
				issuersData.issuersList.push(descriptor);
			});
			return issuersData;
		}
		default:
			return state ?? [];
	}
}