import { VerifiedClaim } from "../uPort/types/VerifiedClaim";

export interface DerivedCredentialSource {
	content: VerifiedClaim;
}

export interface DerivedCredential<Source> {
	content: VerifiedClaim;
	sources: Source[];
}

export const issuanceDateTolerance = 600;

export function deriveCredentials<Source extends DerivedCredentialSource>(
	docs: Source[]
): Array<DerivedCredential<Source>> {
	return docs.map(
		(doc: Source): DerivedCredential<Source> => {
			return { content: doc.content, sources: [doc] };
		}
	);
}
