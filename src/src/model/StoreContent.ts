import { ImageSourcePropType } from "react-native";

export interface Identity {
	name: string;
	id: string;
	image: ImageSourcePropType;
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
