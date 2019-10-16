import * as t from "io-ts";
import * as Either from "fp-ts/lib/Either";
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

export function unverifiedParseJWT(jwt: string): Either.Either<any, SelectiveDisclosureRequest | VerifiedClaim> {
	try {
		const decode = JWTDecode(jwt);
		return AttemptCodec.decode(decode);
	} catch (e) {
		return Either.left(e);
	}
}

export default async function parseJWT(
	jwt: string,
	ethrUri: string
): Promise<Either.Either<any, SelectiveDisclosureRequest | VerifiedClaim>> {
	try {
		const unverifiedContent = unverifiedParseJWT(jwt);
		if (Either.isLeft(unverifiedContent)) {
			return unverifiedContent;
		}

		const ethrDidResolver = getResolver({
			rpcUrl: ethrUri
		});
		const resolver = new Resolver({
			...ethrDidResolver
		});

		const { payload } = await (unverifiedContent.right.type === "VerifiedClaim"
			? verifyCredential(jwt, resolver)
			: verifyJWT(jwt, { resolver }));

		return JWTCodec.decode(payload);
	} catch (e) {
		return Either.left(e);
	}
}
