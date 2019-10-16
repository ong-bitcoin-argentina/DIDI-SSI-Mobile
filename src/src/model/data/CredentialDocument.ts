import { VerifiedClaim } from "../../uPort/types/VerifiedClaim";

export interface CredentialDocument {
	jwt: string;
	content: VerifiedClaim;
}
