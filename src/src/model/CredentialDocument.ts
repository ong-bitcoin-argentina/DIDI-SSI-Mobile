import { VerifiedClaim } from "../uPort/types/VerifiedClaim";

export interface CredentialDocument {
	type: "CredentialDocument";
	jwt: string;
	content: VerifiedClaim;
}
