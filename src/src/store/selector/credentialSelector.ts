import { CredentialDocument, EthrDID, SpecialCredentialFlag } from "didi-sdk";
import { createSelector } from "reselect";
import { isSemillasCrendential } from "../../util/semillasHelpers";

import TypedArray from "../../util/TypedArray";

import { parsedTokenSelector } from "./parsedTokenSelector";
import { credentialState } from "../../presentation/dashboard/common/documentToCard";

const allCredentialSelector = createSelector(parsedTokenSelector, tokens =>
	TypedArray.flatMap(tokens, (tk): CredentialDocument | null => (tk.type === "CredentialDocument" ? tk : null))
);

export const toplevelCredentialSelector = createSelector(
	allCredentialSelector,
	st => st.persisted.did,
	(credentials, did) => {
		const nested = credentials.map(c => c.nested).reduce((acc, next) => acc.concat(next), []);
		const res = credentials.filter(credential => !nested.find(nest => nest.jwt === credential.jwt));

		return res.sort((l, r) => {
			if (l.subject.did() !== r.subject.did()) {
				if (l.subject.did() === did?.activeDid?.did?.()) {
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

export const activeSpecialCredentialsSelector = createSelector(
	toplevelCredentialSelector,
	st => st.persisted.did,
	(credentials, activeDid) => {
		const result: SpecialCredentialMap = {};
		credentials
			.slice()
			.reverse()
			.filter(credential => activeDid === null || credential.subject.did() === activeDid.activeDid?.did?.())
			.forEach(credential => {
				if (credential.specialFlag) {
					result[credential.specialFlag.type] = credential;
				}
			});
		return result;
	}
);

export const allSemillasCredentialsSelector = createSelector(
	allCredentialSelector,
	st => st.persisted.did,
	credentials => {
		return credentials.filter(isSemillasCrendential);
	}
);

const contextSelector = createSelector(
	st => st.persisted,
	activeSpecialCredentialsSelector,
	(persisted, activeSpecialCredentials) => {
		return {
			activeDid: persisted.did.activeDid,
			knownIssuers: persisted.knownIssuers,
			lastTokenSync: persisted.tokensInLastSync,
			specialCredentials: activeSpecialCredentials
		};
	}
);

const credentialStates = {
	obsolete: "obsolete",
	identity: "identity",
	share: "share",
	revoked: "revoked",
	normal: "normal"
};

export const activeSemillasCredentialsSelector = createSelector(
	allSemillasCredentialsSelector,
	contextSelector,
	(credentials, context) => {
		const blacklist = [credentialStates.obsolete, credentialStates.revoked];
		return credentials.filter(cred => !blacklist.includes(credentialState(cred, context)));
	}
);
