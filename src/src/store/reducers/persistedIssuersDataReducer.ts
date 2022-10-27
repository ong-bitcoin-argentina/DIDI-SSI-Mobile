import { IssuersDescriptor } from "@proyecto-didi/app-sdk/src/model/IssuerDescriptor";
import { StoreAction } from "../StoreAction";

interface IssuersActionRegister {
	type: "ISSUERS_DATA";
	content: IssuersDescriptor;
}

interface IssuersActionReset {
	type: "ISSUERS_RESET";
}

const initialValue = {
	issuersList: [],
	totalPages: 0,
};

export type IssuersAction = IssuersActionRegister | IssuersActionReset;

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
		case "ISSUERS_RESET": {
			return initialValue;
		}
		default:
			return state ?? [];
	}
}