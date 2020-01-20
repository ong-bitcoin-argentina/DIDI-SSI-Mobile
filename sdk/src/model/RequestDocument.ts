import { DidiDocument } from "./DidiDocument";
import { EthrDID } from "./EthrDID";

export interface RequestDocument extends DidiDocument {
	type: "RequestDocument";

	callback: string;
	ownClaims: {
		[x: string]: {
			essential?: boolean;
			reason?: string;
		};
	};
	verifiedClaims: {
		[x: string]: {
			essential?: boolean;
			iss?: Array<{
				did: EthrDID;
				url?: string;
			}>;
			reason?: string;
		};
	};
}

export const RequestDocument = DidiDocument;
