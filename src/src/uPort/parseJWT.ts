import * as t from "io-ts";
import { Either, left, isLeft } from "fp-ts/lib/Either";
import JWTDecode from "jwt-decode";

import { verifyJWT } from "did-jwt";
import { verifyCredential } from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

import { SelectiveDisclosureRequestCodec, SelectiveDisclosureRequest } from "./types/SelectiveDisclosureRequest";
import { VerifiedClaimCodec, VerifiedClaim } from "./types/VerifiedClaim";
import { LegacyVerifiedClaimCodec } from "./types/LegacyVerifiedClaim";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	global.Buffer = require("buffer").Buffer;
}

const JWTCodec = t.union([SelectiveDisclosureRequestCodec, VerifiedClaimCodec]);
const AttemptCodec = t.union([JWTCodec, LegacyVerifiedClaimCodec]);

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

export function unverifiedParseJWT(jwt: string): Either<JWTParseError, SelectiveDisclosureRequest | VerifiedClaim> {
	try {
		const decoded = JWTDecode(jwt);
		const parsed = AttemptCodec.decode(decoded);
		if (isLeft(parsed)) {
			return left({ type: "SHAPE_DECODE_ERROR", error: parsed.left });
		}

		const now = Math.floor(Date.now() / 1000);
		if (parsed.right.expireAt !== undefined && parsed.right.expireAt < now) {
			return left({ type: "AFTER_EXP", expected: parsed.right.expireAt, current: now });
		} else if (parsed.right.issuedAt !== undefined && now < parsed.right.issuedAt) {
			return left({ type: "BEFORE_IAT", expected: parsed.right.issuedAt, current: now });
		} else {
			return parsed;
		}
	} catch (e) {
		return left({ type: "JWT_DECODE_ERROR", error: e });
	}
}

export default async function parseJWT(
	jwt: string,
	ethrUri: string
): Promise<Either<JWTParseError, SelectiveDisclosureRequest | VerifiedClaim>> {
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
			const { payload } = await (unverifiedContent.right.type === "VerifiedClaim"
				? verifyCredential(jwt, resolver)
				: verifyJWT(jwt, { resolver }));

			const verified = JWTCodec.decode(payload);
			if (isLeft(verified)) {
				return left({ type: "SHAPE_DECODE_ERROR", error: verified.left });
			}
			return verified;
		} catch (e) {
			return left({ type: "VERIFICATION_ERROR", error: e });
		}
	} catch (e) {
		return left({ type: "RESOLVER_CREATION_ERROR" });
	}
}
