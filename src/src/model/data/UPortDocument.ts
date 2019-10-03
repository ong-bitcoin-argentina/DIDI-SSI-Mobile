import { VerifiedClaim } from "../../uPort/VerifiedClaim";

export interface UPortDocument {
	jwt: string;
	claim: VerifiedClaim;
}
