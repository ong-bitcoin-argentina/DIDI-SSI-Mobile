import { RNUportHDSigner } from "react-native-uport-signer";
import { Credentials } from "uport-credentials";

function normalizeRecoveryParam(v: number): 0 | 1 {
	switch (v) {
		case 0:
		case 27:
			return 0;
		case 1:
		case 28:
			return 1;
		default:
			throw new Error(`Signing library returned invalid recovery param '${v}'`);
	}
}

export async function getCredentials() {
	console.log('getCredentials');
	const addresses = await RNUportHDSigner.listSeedAddresses();
	const addressToUse = addresses.length === 0 ? (await RNUportHDSigner.createSeed("simple")).address : addresses[0];

	return new Credentials({
		did: `did:ethr:${addressToUse}`,
		signer: async (data: string) => {
			const { r, s, v } = await RNUportHDSigner.signJwt(
				addressToUse,
				RNUportHDSigner.UPORT_ROOT_DERIVATION_PATH,
				Buffer.from(data).toString("base64"),
				"firmar la respuesta"
			);
			return {
				r: Buffer.from(r, "base64").toString("hex"),
				s: Buffer.from(s, "base64").toString("hex"),
				recoveryParam: normalizeRecoveryParam(v)
			};
		}
	});
}
