import { verifyJWT } from "did-jwt";
import { Resolver, DIDDocument } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { SelectiveDisclosureRequest, parseSelectiveDisclosureRequest } from "./SelectiveDisclosureRequest";
import { VerifiedClaim, parseVerifiedClaim } from "./VerifiedClaim";
import { SelectiveDisclosureResponse, parseSelectiveDisclosureResponse } from "./SelectiveDisclosureResponse";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	global.Buffer = require("buffer").Buffer;
}

const ethrDidResolver = getResolver({
	rpcUrl: "https://rinkeby.infura.io/ethr-did"
});
const resolver = new Resolver(ethrDidResolver);

type JWTParseResult =
	| { error: "MISSING_TYPE_AND_CLAIM" | "PAYLOAD_IS_NOT_OBJECT"; content: any }
	| { error: "UNKNOWN_TYPE"; type: string }
	| { error: "MISSING_FIELD"; checked: string[] }
	| { error: null; payload: SelectiveDisclosureRequest | SelectiveDisclosureResponse | VerifiedClaim };

async function parseJWT(jwt: string): Promise<JWTParseResult> {
	const { payload: unknownPayload } = await verifyJWT(jwt, { resolver });

	if (typeof unknownPayload !== "object") {
		return { error: "PAYLOAD_IS_NOT_OBJECT", content: unknownPayload };
	} else if (unknownPayload.claim) {
		return parseVerifiedClaim(unknownPayload);
	} else if (unknownPayload.type) {
		if (unknownPayload.type === "shareReq") {
			return parseSelectiveDisclosureRequest(unknownPayload);
		} else if (unknownPayload.type === "shareResp") {
			return parseSelectiveDisclosureResponse(unknownPayload);
		} else {
			return { error: "UNKNOWN_TYPE", type: unknownPayload.type };
		}
	} else {
		return { error: "MISSING_TYPE_AND_CLAIM", content: unknownPayload };
	}
}

export default parseJWT;
