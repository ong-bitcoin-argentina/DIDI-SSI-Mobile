import { liftUndefined2 } from "../util/liftUndefined";

import strings from "../presentation/resources/strings";
import { flattenClaim, FlattenedClaim } from "../uPort/types/Claim";
import { ClaimMetadata, VerifiedClaim } from "../uPort/types/VerifiedClaim";

import { extractSpecialCredentialData, SpecialCredentialFlag } from "./SpecialCredential";

export interface DerivedCredentialSource {
	content: VerifiedClaim;
}

export interface DerivedCredential<Source> {
	data: ClaimMetadata;
	sources: Source[];
	rootClaim: string;
	claims: FlattenedClaim;
}

interface DerivedCredentialInMerge<Source> extends DerivedCredential<Source> {
	canMerge: boolean;
}

export const issuanceDateTolerance = 600;

export function liftToDerivedCredential<Source extends DerivedCredentialSource>(
	doc: Source
): DerivedCredentialInMerge<Source> {
	const flat = flattenClaim(doc.content.claims);
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
				rootClaim: strings.specialCredentials.PhoneNumberData,
				claims: { [strings.specialCredentials.PhoneNumberData]: special.phoneNumber },
				canMerge: false
			};
		case "EmailData":
			return {
				data,
				sources: [doc],
				rootClaim: strings.specialCredentials.EmailData,
				claims: { [strings.specialCredentials.EmailData]: special.email },
				canMerge: false
			};
		case "None":
			return {
				data,
				sources: [doc],
				rootClaim: flat.root.replace(new RegExp("_.*", "g"), ""),
				claims: flat.rest,
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
		left.rootClaim === right.rootClaim &&
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
		rootClaim: left.rootClaim,
		data,
		claims: {
			...left.claims,
			...right.claims
		},
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
			rootClaim: credential.rootClaim,
			claims: credential.claims
		}));
}
