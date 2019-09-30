export class VerifiedClaimSelector {
	name: string;
	issuer?: string;

	constructor(name: string, issuer?: string) {
		this.name = name;
		this.issuer = issuer;
	}
}
