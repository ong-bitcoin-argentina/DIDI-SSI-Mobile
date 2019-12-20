import { ImageSourcePropType } from "react-native";

export interface VisualData {
	id: string;
	image: ImageSourcePropType;
	backgroundImage: ImageSourcePropType;
	name: string;
}

export interface PersonalIdentityData {
	firstNames: string;
	lastNames: string;
	document: string;
	nationality: string;
}

export interface PersonalData extends PersonalIdentityData {
	cellPhone: string;
	email: string;
}

export interface LegalAddress {
	street: string;
	number: string;
	department: string;
	floor: string;
	neighborhood: string;
	postCode: string;
}

export interface Identity {
	visual: Partial<VisualData>;
	personalData: Partial<PersonalData>;
	address: Partial<LegalAddress>;
}
