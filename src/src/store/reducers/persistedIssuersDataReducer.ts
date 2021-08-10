import { IssuersDescriptor } from "didi-sdk/src/model/IssuerDescriptor";
import { DocumentDirectoryPath, readFile } from "react-native-fs";
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
		case "ISSUERS_DATA":
			let issuersData = {
				issuersList: [] as any,
				totalPages: action.content.totalPages,
			}
			action.content.issuersList.forEach(async descriptor => {
				if (descriptor.imageId) {
					const imgPath = `${DocumentDirectoryPath}/${descriptor.imageId}.jpeg`;
					console.log("imgPath: ", imgPath)
					const dataImg = await readFile(imgPath, "base64");
					const img = `data:image/jpeg;base64,${imgPath}`
					let issuerData = {
						...descriptor,
						image: img,
					};
					issuersData.issuersList.push(issuerData);
				} else {
					issuersData.issuersList.push(descriptor);
				}
			});
			return issuersData;
		default:
			return state ?? [];
	}
}