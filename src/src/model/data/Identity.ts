import { ImageSourcePropType } from "react-native";

export enum ValidationState {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected",
	None = "None"
}

export interface WithValidationState<T> {
	value: T;
	state: ValidationState;
}

export interface Identity {
	id: string;
	image: ImageSourcePropType;
	backgroundImage: ImageSourcePropType;
	name: string;

	fullName: WithValidationState<string>;
	cellPhone: WithValidationState<string>;
	email: WithValidationState<string>;
	document: WithValidationState<string>;
	nationality: WithValidationState<string>;
	address: WithValidationState<string>;
}
