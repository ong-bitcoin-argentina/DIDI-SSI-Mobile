import { ImageSourcePropType } from "react-native";

export enum ValidationState {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected"
}

export interface WithValidationState<T> {
	value: T;
	state: ValidationState;
}

export type LegalAddress = Partial<{
	street: string;
	number: string;
	department: string;
	floor: string;
	neighborhood: string;
	postCode: string;
	liveHere: boolean;
}>;

export type Identity = Partial<{
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
}>;
