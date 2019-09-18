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
	name: string;

	fullName: WithValidationState<string>;
	cellPhone: WithValidationState<string>;
	email: WithValidationState<string>;
	document: WithValidationState<string>;
	nationality: WithValidationState<string>;
	address: WithValidationState<string>;
}

export type DocumentFilterType = "livingPlace" | "identity" | "other";

export interface Document {
	icon: ImageSourcePropType;
	image?: ImageSourcePropType;
	category: string;
	title: string;
	subtitle: string;
	filterType: DocumentFilterType;
	columns: 1 | 2 | 3;
	data: Array<{ label: string; value: string }>;
}

export interface RecentActivity {
	icon: ImageSourcePropType;
	title: string;
	description: string;
	state: string;
	date: string;
}

export interface LoggedInStoreContent {
	loggedIn: true;

	identity: Identity;
	documents: Document[];
	recentActivity: RecentActivity[];
}

export interface LoggedOutStoreContent {
	loggedIn: false;
}

type StoreContent = LoggedInStoreContent | LoggedOutStoreContent;

export default StoreContent;
