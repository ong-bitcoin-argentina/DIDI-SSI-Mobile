import { CredentialDocument } from "@proyecto-didi/app-sdk";

import strings from "../presentation/resources/strings";

export interface RecentActivity {
	date: string;
	type: "CREATE" | "SHARE" | "RECEIVE";
	credentialTitle: string[];
	credentialKey: string[] ;
	issuedAt: number[]
}

export const RecentActivity = {
	from(type: RecentActivity["type"], documents: CredentialDocument[]): RecentActivity {
		return {
			date: new Date().toISOString(),
			type,
			credentialTitle: documents.map(doc =>
				doc.specialFlag ? strings.specialCredentials[doc.specialFlag.type].title : doc.title
			),
			credentialKey: documents.map(doc => doc.category),
			issuedAt:documents.map(doc =>  doc.issuedAt ),
		};
	}
};
