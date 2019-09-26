import { verifyJWT } from "did-jwt";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

// This is required by verifyJWT
if (typeof Buffer === "undefined") {
	global.Buffer = require("buffer").Buffer;
}

const ethrDidResolver = getResolver({
	rpcUrl: "https://rinkeby.infura.io/ethr-did"
});
const resolver = new Resolver(ethrDidResolver);

async function parseJWT(jwt: string): Promise<any> {
	return verifyJWT(jwt, { resolver });
}

export default parseJWT;
