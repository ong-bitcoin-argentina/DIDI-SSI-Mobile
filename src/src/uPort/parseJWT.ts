import * as t from "io-ts";
import { left } from "fp-ts/lib/Either";

import { verifyJWT } from "did-jwt";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

import { SelectiveDisclosureRequestCodec } from "./SelectiveDisclosureRequest";
import { VerifiedClaimCodec } from "./VerifiedClaim";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	global.Buffer = require("buffer").Buffer;
}

const ethrDidResolver = getResolver({
	rpcUrl: "https://rinkeby.infura.io/ethr-did"
});
const resolver = new Resolver(ethrDidResolver);

const JWTCodec = t.union([SelectiveDisclosureRequestCodec, VerifiedClaimCodec]);

export default async function parseJWT(jwt: string) {
	try {
		const { payload } = await verifyJWT(jwt, { resolver });
		return JWTCodec.decode(payload);
	} catch (e) {
		return left(e);
	}
}
