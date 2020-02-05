import { CredentialDocument, EthrDID, SpecialCredentialFlag } from "didi-sdk";
import { createSelector } from "reselect";

import TypedArray from "../../util/TypedArray";

import { parsedTokenSelector } from "./parsedTokenSelector";

const allCredentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);

export const toplevelCredentialSelector = createSelector(
	allCredentialSelector,
	st => st.persisted.did,
	(credentials, did) => {
		const nested = credentials.map(c => c.nested).reduce((acc, next) => acc.concat(next), []);
		const res = credentials.filter(credential => !nested.find(nest => nest.jwt === credential.jwt));

		res.push({
			data: {
				"1": "1"
			},
			issuer: EthrDID.fromKeyAddress("0x0123456789012345678901234567890123456789"),
			jwt: "1223rqwe",
			nested,
			subject: EthrDID.fromKeyAddress("0x1234567890123456789012345678901234567890"),
			title: "Share",
			type: "CredentialDocument",
			category: "finance"
		});

		return res.sort((l, r) => {
			if (l.subject.did() !== r.subject.did()) {
				if (l.subject.did() === did?.did?.()) {
					return -1;
				} else {
					return +1;
				}
			} else if (l.issuedAt) {
				if (r.issuedAt) {
					return r.issuedAt - l.issuedAt;
				} else {
					return +1;
				}
			} else {
				return -1;
			}
		});
	}
);

export type SpecialCredentialMap = Partial<Record<NonNullable<SpecialCredentialFlag>["type"], CredentialDocument>>;

export const activeSpecialCredentialsSelector = createSelector(toplevelCredentialSelector, credentials => {
	const result: SpecialCredentialMap = {};
	credentials
		.slice()
		.reverse()
		.forEach(credential => {
			if (credential.specialFlag) {
				result[credential.specialFlag.type] = credential;
			}
		});
	return result;
});
