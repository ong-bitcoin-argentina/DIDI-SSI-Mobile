import { verifyJWT } from "did-jwt";
import { verifyCredential } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { Either, isLeft, isRight, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";
import JWTDecode from "jwt-decode";

import { assertUnreachable } from "../util/assertUnreachable";

import { CredentialDocument } from "../model/CredentialDocument";
import { RequestDocument } from "../model/RequestDocument";

import { ForwardedRequestCodec } from "./types/ForwardedRequest";
import { LegacyVerifiedClaimCodec } from "./types/LegacyVerifiedClaim";
import { SelectiveDisclosureRequestCodec } from "./types/SelectiveDisclosureRequest";
import { VerifiedClaimCodec } from "./types/VerifiedClaim";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	// tslint:disable-next-line: no-var-requires
	global.Buffer = require("buffer").Buffer;
}

const PublicCodec = t.union([SelectiveDisclosureRequestCodec, VerifiedClaimCodec]);
const ParseCodec = t.union([PublicCodec, ForwardedRequestCodec]);
const TransportCodec = t.union([ParseCodec, LegacyVerifiedClaimCodec]);

export type JWTParseError =
	| {
			type: "AFTER_EXP" | "BEFORE_IAT";
			expected: number;
			current: number;
	  }
	| {
			type: "JWT_DECODE_ERROR" | "SHAPE_DECODE_ERROR" | "VERIFICATION_ERROR";
			error: any;
	  }
	| {
			type: "RESOLVER_CREATION_ERROR";
	  };

export type JWTParseResult = Either<JWTParseError, RequestDocument | CredentialDocument>;

export function unverifiedParseJWT(jwt: string): JWTParseResult {
	try {
		const decoded = JWTDecode(jwt);
		const parsed = TransportCodec.decode(decoded);
		if (isLeft(parsed)) {
			return left({ type: "SHAPE_DECODE_ERROR", error: parsed.left });
		}

		const unverified = parsed.right;
		const now = Math.floor(Date.now() / 1000);
		if (unverified.expireAt !== undefined && unverified.expireAt < now) {
			return left({ type: "AFTER_EXP", expected: unverified.expireAt, current: now });
		} else if (unverified.issuedAt !== undefined && now < unverified.issuedAt) {
			return left({ type: "BEFORE_IAT", expected: unverified.issuedAt, current: now });
		} else {
			switch (unverified.type) {
				case "SelectiveDisclosureRequest":
					return right({ type: "RequestDocument", jwt, content: unverified });
				case "VerifiedClaim":
					return right({ type: "CredentialDocument", jwt, content: unverified });
				case "ForwardedRequest":
					return unverifiedParseJWT(unverified.forwarded);
				default:
					return assertUnreachable(unverified);
			}
		}
	} catch (e) {
		return left({ type: "JWT_DECODE_ERROR", error: e });
	}
}

export default async function parseJWT(jwt: string, ethrUri: string): Promise<JWTParseResult> {
	const unverifiedContent = unverifiedParseJWT(jwt);
	if (isLeft(unverifiedContent)) {
		return unverifiedContent;
	}

	try {
		const ethrDidResolver = getResolver({
			rpcUrl: ethrUri
		});
		const resolver = new Resolver({
			...ethrDidResolver
		});

		try {
			const { payload } = await (unverifiedContent.right.content.type === "VerifiedClaim"
				? verifyCredential(jwt, resolver)
				: verifyJWT(jwt, { resolver }));

			const parsed = ParseCodec.decode(payload);
			if (isLeft(parsed)) {
				return left({ type: "SHAPE_DECODE_ERROR", error: parsed.left });
			}

			const verified = parsed.right;
			switch (verified.type) {
				case "SelectiveDisclosureRequest":
					return right({ type: "RequestDocument", jwt, content: verified });
				case "VerifiedClaim":
					return right({ type: "CredentialDocument", jwt, content: verified });
				case "ForwardedRequest":
					return parseJWT(verified.forwarded, ethrUri);
				default:
					return assertUnreachable(verified);
			}
		} catch (e) {
			return left({ type: "VERIFICATION_ERROR", error: e });
		}
	} catch (e) {
		return left({ type: "RESOLVER_CREATION_ERROR" });
	}
}

export function compareParseResults(l: JWTParseResult, r: JWTParseResult): number {
	if (isRight(l)) {
		return -1;
	} else if (isRight(r)) {
		return 1;
	} else if (r.left.type === "JWT_DECODE_ERROR") {
		return -1;
	} else if (l.left.type === "JWT_DECODE_ERROR") {
		return 1;
	} else {
		return 0;
	}
}
