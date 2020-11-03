export enum CredentialStates {
	share = "share",
	identity = "identity",
	obsolete = "obsolete",
	revoked = "revoked",
	normal = "normal"
}

export const blacklistedCredentialStates = [CredentialStates.obsolete, CredentialStates.revoked];
