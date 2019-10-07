import * as t from "io-ts";
import * as Either from "fp-ts/lib/Either";
import JWTDecode from "jwt-decode";

import { verifyJWT } from "did-jwt";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

import { SelectiveDisclosureRequestCodec, SelectiveDisclosureRequest } from "./SelectiveDisclosureRequest";
import { VerifiedClaimCodec, VerifiedClaim } from "./VerifiedClaim";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	global.Buffer = require("buffer").Buffer;
}

const ethrDidResolver = getResolver({
	rpcUrl: "https://rinkeby.infura.io/ethr-did"
});
const resolver = new Resolver(ethrDidResolver);

const JWTCodec = t.union([SelectiveDisclosureRequestCodec, VerifiedClaimCodec]);

export default async function parseJWT(
	jwt: string
): Promise<Either.Either<any, SelectiveDisclosureRequest | VerifiedClaim>> {
	try {
		const unverifiedContent = JWTCodec.decode(JWTDecode(jwt));
		if (Either.isLeft(unverifiedContent)) {
			return unverifiedContent;
		}

		const { payload } = await verifyJWT(jwt, { resolver });
		return JWTCodec.decode(payload);
	} catch (e) {
		return Either.left(e);
	}
}
