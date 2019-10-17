import { VerifiedClaim, ClaimMetadata } from "../uPort/types/VerifiedClaim";
import { FlattenedClaim, flattenClaim } from "../uPort/types/Claim";

export interface DerivedCredentialSource {
	content: VerifiedClaim;
}

export interface DerivedCredential<Source> {
	data: ClaimMetadata;
	sources: Source[];
	rootClaim: string;
	claims: FlattenedClaim;
}

export const issuanceDateTolerance = 600;

export function liftToDerivedCredential<Source extends DerivedCredentialSource>(
	doc: Source
): DerivedCredential<Source> {
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
	return {
		data,
		sources: [doc],
		rootClaim: flat.root.replace(new RegExp("_.*", "g"), ""),
		claims: flat.rest
	};
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

function shouldMerge(left: DerivedCredential<unknown>, right: DerivedCredential<unknown>): boolean {
	return (
		left.rootClaim === right.rootClaim &&
		left.data.issuer === right.data.issuer &&
		left.data.subject === right.data.subject &&
		issuanceDateAllowsMerge(left.data.issuedAt, right.data.issuedAt)
	);
}

function liftUndefined2<T, U, V>(
	left: T | undefined,
	right: U | undefined,
	fn: (left: T, right: U) => V
): V | undefined {
	if (left === undefined || right === undefined) {
		return undefined;
	} else {
		return fn(left, right);
	}
}

function doMerge<T>(left: DerivedCredential<T>, right: DerivedCredential<T>): DerivedCredential<T> {
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
		}
	};
}

export function deriveCredentials<Source extends DerivedCredentialSource>(
	docs: Source[]
): Array<DerivedCredential<Source>> {
	// TODO: Actually derive credentials
	return docs
		.map(liftToDerivedCredential)
		.reduce((acc: Array<DerivedCredential<Source>>, curr: DerivedCredential<Source>) => {
			const index = acc.findIndex(doc => shouldMerge(doc, curr));
			if (index !== -1) {
				const next = [...acc];
				next[index] = doMerge(next[index], curr);
				return next;
			} else {
				return [...acc, curr];
			}
		}, []);
}
