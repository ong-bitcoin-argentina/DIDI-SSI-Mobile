import { createSelector } from "reselect";

import { RecentActivity } from "../../model/RecentActivity";

import { toplevelCredentialSelector } from "./credentialSelector";

export const combinedRecentActivitySelector = createSelector(
	st => st.persisted.did,
	toplevelCredentialSelector,
	st => st.persisted.recentActivity,
	(did, credentials, recentActivity) => {
		const derived = credentials
			.filter(doc => doc.subject.did() === did?.did())
			.map(doc => ({
				...RecentActivity.from("CREATE", [doc]),
				...(doc.issuedAt ? { date: new Date(doc.issuedAt * 1000) } : {})
			}));
		return [...derived, ...recentActivity].sort((l, r) => (l.date > r.date ? -1 : 1));
	}
);
