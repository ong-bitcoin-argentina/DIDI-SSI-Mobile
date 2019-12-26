import { LegalAddress, PersonalData } from "../../../../model/Identity";
import strings from "../../../resources/strings";

interface InputFieldDescription {
	name: string;
	keyboardType?: "number-pad" | "email-address" | "phone-pad";
}

export interface ProfileInputDataStructure<T> {
	name: string;
	order: Array<keyof T>;
	structure: { [K in keyof T]: InputFieldDescription };
}

export const personalDataStructure: ProfileInputDataStructure<PersonalData> = {
	name: strings.userData.personalDataLabel,
	order: ["firstNames", "lastNames", "cellPhone", "email", "document", "nationality"],
	structure: {
		cellPhone: {
			name: strings.userData.editProfile.cellMessage,
			keyboardType: "phone-pad"
		},
		document: {
			name: strings.userData.editProfile.documentMessage,
			keyboardType: "number-pad"
		},
		email: {
			name: strings.userData.editProfile.emailMessage,
			keyboardType: "email-address"
		},
		firstNames: {
			name: strings.userData.editProfile.firstNameMessage
		},
		lastNames: {
			name: strings.userData.editProfile.lastNameMessage
		},
		nationality: {
			name: strings.userData.editProfile.nationalityMessage
		}
	}
};

export const addressDataStructure: ProfileInputDataStructure<LegalAddress> = {
	name: strings.userData.addressDataLabel,
	order: ["street", "number", "department", "floor", "neighborhood", "postCode"],
	structure: {
		department: {
			name: strings.userData.editProfile.departmentMessage
		},
		floor: {
			name: strings.userData.editProfile.floorMessage
		},
		neighborhood: {
			name: strings.userData.editProfile.neighborhoodMessage
		},
		number: {
			name: strings.userData.editProfile.numberMessage
		},
		postCode: {
			name: strings.userData.editProfile.postCodeMessage
		},
		street: {
			name: strings.userData.editProfile.streetMessage
		}
	}
};
