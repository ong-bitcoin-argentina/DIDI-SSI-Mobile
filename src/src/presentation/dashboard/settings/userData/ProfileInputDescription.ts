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
	name: strings.dashboard.userData.personalDataLabel,
	order: ["fullName", "cellPhone", "email", "document", "nationality"],
	structure: {
		cellPhone: {
			name: strings.dashboard.userData.editProfile.cellMessage,
			keyboardType: "phone-pad"
		},
		document: {
			name: strings.dashboard.userData.editProfile.documentMessage,
			keyboardType: "number-pad"
		},
		email: {
			name: strings.dashboard.userData.editProfile.emailMessage,
			keyboardType: "email-address"
		},
		fullName: {
			name: strings.dashboard.userData.editProfile.fullNameMessage
		},
		nationality: {
			name: strings.dashboard.userData.editProfile.nationalityMessage
		}
	}
};

export const addressDataStructure: ProfileInputDataStructure<LegalAddress> = {
	name: strings.dashboard.userData.addressDataLabel,
	order: ["street", "number", "department", "floor", "neighborhood", "postCode"],
	structure: {
		department: {
			name: strings.dashboard.userData.editProfile.departmentMessage
		},
		floor: {
			name: strings.dashboard.userData.editProfile.floorMessage
		},
		neighborhood: {
			name: strings.dashboard.userData.editProfile.neighborhoodMessage
		},
		number: {
			name: strings.dashboard.userData.editProfile.numberMessage
		},
		postCode: {
			name: strings.dashboard.userData.editProfile.postCodeMessage
		},
		street: {
			name: strings.dashboard.userData.editProfile.streetMessage
		}
	}
};
