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

const ethrDidResolver = getResolver({
	rpcUrl: "https://rinkeby.infura.io/ethr-did"
});
const resolver = new Resolver(ethrDidResolver);

const JWTCodec = t.union([SelectiveDisclosureRequestCodec, VerifiedClaimCodec]);
const AttemptCodec = t.union([JWTCodec, LegacyVerifiedClaimCodec]);

export default async function parseJWT(
	jwt: string
): Promise<Either.Either<any, SelectiveDisclosureRequest | VerifiedClaim>> {
	try {
		const unverifiedContent = AttemptCodec.decode(JWTDecode(jwt));
		if (Either.isLeft(unverifiedContent)) {
			return unverifiedContent;
		}

		const { payload } = await (unverifiedContent.right.type === "VerifiedClaim"
			? verifyCredential(jwt, resolver)
			: verifyJWT(jwt, { resolver }));
		return JWTCodec.decode(payload);
	} catch (e) {
		return Either.left(e);
	}
}
