import { ImageSourcePropType } from "react-native";

export type DocumentFilterType = "livingPlace" | "identity" | "other";

export interface Document {
	icon: string;
	image?: ImageSourcePropType;
	category: string;
	title: string;
	subtitle: string;
	filterType: DocumentFilterType;
	columns: 1 | 2 | 3;
	data: Array<{ label: string; value: string }>;
}
