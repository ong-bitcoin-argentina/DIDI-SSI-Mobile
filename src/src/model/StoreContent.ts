import { ImageSourcePropType } from "react-native";

export interface Identity {
	name: string;
	id: string;
	image: ImageSourcePropType;
}

interface Document {}

interface RecentActivity {}

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
