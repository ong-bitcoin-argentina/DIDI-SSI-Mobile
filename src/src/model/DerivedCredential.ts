import { liftUndefined2 } from "../util/liftUndefined";

import strings from "../presentation/resources/strings";
import { Claim, ClaimData } from "../uPort/types/Claim";
import { ClaimMetadata, VerifiedClaim } from "../uPort/types/VerifiedClaim";

import { extractSpecialCredentialData, SpecialCredentialFlag } from "./SpecialCredential";

export interface DerivedCredentialSource {
	content: VerifiedClaim;
}

export interface DerivedCredential<Source> {
	data: ClaimMetadata;
	sources: Source[];
	claim: Claim;
}

interface DerivedCredentialInMerge<Source> extends DerivedCredential<Source> {
	canMerge: boolean;
}

export const issuanceDateTolerance = 600;

export function liftToDerivedCredential<Source extends DerivedCredentialSource>(
	doc: Source
): DerivedCredentialInMerge<Source> {
	const data: ClaimMetadata = {
		issuer: doc.content.issuer,
		subject: doc.content.subject
	};
	if (doc.content.issuedAt) {
		data.issuedAt = doc.content.issuedAt;
	}
	if (doc.content.expireAt) {
		data.expireAt = doc.content.expireAt;
	}

	const special = extractSpecialCredentialData(doc.content.claims);

	switch (special.type) {
		case "PhoneNumberData":
			return {
				data,
				sources: [doc],
				claim: new Claim(strings.specialCredentials.PhoneNumberData, {
					[strings.specialCredentials.PhoneNumberData]: special.phoneNumber
				}),
				canMerge: false
			};
		case "EmailData":
			return {
				data,
				sources: [doc],
				claim: new Claim(strings.specialCredentials.EmailData, {
					[strings.specialCredentials.EmailData]: special.email
				}),
				canMerge: false
			};
		case "None":
			return {
				data,
				sources: [doc],
				claim: doc.content.claims,
				canMerge: true
			};
	}
}

function issuanceDateAllowsMerge(left: number | undefined, right: number | undefined): boolean {
	if (left === undefined && right === undefined) {
		return true;
	} else if (left !== undefined && right !== undefined) {
		return Math.abs(left - right) < issuanceDateTolerance;
	} else {
		return false;
	}
}

function shouldMerge(left: DerivedCredentialInMerge<unknown>, right: DerivedCredentialInMerge<unknown>): boolean {
	return (
		left.canMerge &&
		right.canMerge &&
		left.claim.title === right.claim.title &&
		left.data.issuer === right.data.issuer &&
		left.data.subject === right.data.subject &&
		issuanceDateAllowsMerge(left.data.issuedAt, right.data.issuedAt)
	);
}

function doMerge<T>(
	left: DerivedCredentialInMerge<T>,
	right: DerivedCredentialInMerge<T>
): DerivedCredentialInMerge<T> {
	const data: ClaimMetadata = {
		issuer: left.data.issuer,
		subject: left.data.subject
	};

	const expireAt = liftUndefined2(left.data.expireAt, right.data.expireAt, Math.min);
	if (expireAt) {
		data.expireAt = expireAt;
	}

	const issuedAt = liftUndefined2(left.data.issuedAt, right.data.issuedAt, Math.max);
	if (issuedAt) {
		data.issuedAt = issuedAt;
	}

	return {
		sources: [...left.sources, ...right.sources],
		claim: new Claim(left.claim.title, {
			...left.claim.data,
			...right.claim.data
		}),
		data,
		canMerge: true
	};
}

export function deriveCredentials<Source extends DerivedCredentialSource>(
	docs: Source[]
): Array<DerivedCredential<Source>> {
	// TODO: Actually derive credentials
	return docs
		.map(liftToDerivedCredential)
		.reduce((acc: Array<DerivedCredentialInMerge<Source>>, curr: DerivedCredentialInMerge<Source>) => {
			const index = acc.findIndex(doc => shouldMerge(doc, curr));
			if (index !== -1) {
				const next = [...acc];
				next[index] = doMerge(next[index], curr);
				return next;
			} else {
				return [...acc, curr];
			}
		}, [])
		.map(credential => ({
			data: credential.data,
			sources: credential.sources,
			claim: credential.claim
		}));
}
