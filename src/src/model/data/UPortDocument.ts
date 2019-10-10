import { VerifiedClaim } from "../../uPort/types/VerifiedClaim";

export interface UPortDocument {
	jwt: string;
	claim: VerifiedClaim;
}
