import { ImageSourcePropType } from "react-native";

export interface VisualData {
	id: string;
	image: ImageSourcePropType;
	backgroundImage: ImageSourcePropType;
	name: string;
}

export interface PersonalData {
	fullName: string;
	cellPhone: string;
	email: string;
	document: string;
	nationality: string;
}

export interface LegalAddress {
	street: string;
	number: string;
	department: string;
	floor: string;
	neighborhood: string;
	postCode: string;
	liveHere: boolean;
}

export interface Identity {
	visual: Partial<VisualData>;
	personalData: Partial<PersonalData>;
	address: Partial<LegalAddress>;
}
