import { ImageSourcePropType } from "react-native";
import { VerifiedClaim } from "../../uPort/VerifiedClaim";

export type DocumentFilterType = "livingPlace" | "identity" | "other";

interface DidiDocument {
	type: "didi";
	icon: string;
	image?: ImageSourcePropType;
	category: string;
	title: string;
	subtitle: string;
	filterType: DocumentFilterType;
	columns: 1 | 2 | 3;
	data: Array<{ label: string; value: string }>;
}

interface UPortDocument {
	type: "uPort";
	filterType: "other";
	jwt: string;
	claim: VerifiedClaim;
}

export type Document = DidiDocument | UPortDocument;
