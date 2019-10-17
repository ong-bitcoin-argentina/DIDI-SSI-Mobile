import { ImageSourcePropType } from "react-native";

export enum ValidationState {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected"
}

export interface WithValidationState<T> {
	value: T;
	state?: ValidationState;
}

export interface LegalAddress {
	street: string;
	number: string;
	department?: string;
	floor?: string;
	neighborhood: string;
	postCode: string;
	liveHere: boolean;
}

export interface Identity {
	id: string;
	image: ImageSourcePropType;
	backgroundImage: ImageSourcePropType;

	name: string;
	address: LegalAddress;

	fullName: WithValidationState<string>;
	cellPhone: WithValidationState<string>;
	email: WithValidationState<string>;
	document: WithValidationState<string>;
	nationality: WithValidationState<string>;
}
