import { ClaimDataPairs } from "./Claim";

export type DocumentFilterType = "livingPlace" | "identity" | "other";

export interface SampleDocument {
	icon: string;
	category: string;
	title: string;
	subtitle: string;
	filterType: DocumentFilterType;
	columns: 1 | 2 | 3;
	data: ClaimDataPairs;
}
