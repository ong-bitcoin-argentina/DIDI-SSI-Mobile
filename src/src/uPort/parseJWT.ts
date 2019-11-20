import { verifyJWT } from "did-jwt";
import { verifyCredential } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { Either, isLeft, isRight, left, right } from "fp-ts/lib/Either";
import * as t from "io-ts";
import JWTDecode from "jwt-decode";

import { assertUnreachable } from "../util/assertUnreachable";
import TypedArray from "../util/TypedArray";

import { CredentialDocument } from "../model/CredentialDocument";
import { RequestDocument } from "../model/RequestDocument";

import { JWTParseError } from "./JWTParseError";
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

export type JWTParseResult = Either<JWTParseError, RequestDocument | CredentialDocument>;

function extractIoError(errors: t.Errors): string {
	return TypedArray.flatMap(errors, e => e.message).join(", ") + ".";
}

export function unverifiedParseJWT(jwt: string): JWTParseResult {
	try {
		const decoded = JWTDecode(jwt);
		const parsed = TransportCodec.decode(decoded);
		if (isLeft(parsed)) {
			return left(new JWTParseError({ type: "SHAPE_DECODE_ERROR", errorMessage: extractIoError(parsed.left) }));
		}

		const unverified = parsed.right;
		const now = Math.floor(Date.now() / 1000);
		if (unverified.expireAt !== undefined && unverified.expireAt < now) {
			return left(new JWTParseError({ type: "AFTER_EXP", expected: unverified.expireAt, current: now }));
		} else if (unverified.issuedAt !== undefined && now < unverified.issuedAt) {
			return left(new JWTParseError({ type: "BEFORE_IAT", expected: unverified.issuedAt, current: now }));
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
		return left(new JWTParseError({ type: "JWT_DECODE_ERROR", error: e }));
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
				return left(new JWTParseError({ type: "SHAPE_DECODE_ERROR", errorMessage: extractIoError(parsed.left) }));
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
			return left(new JWTParseError({ type: "VERIFICATION_ERROR", error: e }));
		}
	} catch (e) {
		return left(new JWTParseError({ type: "RESOLVER_CREATION_ERROR" }));
	}
}
