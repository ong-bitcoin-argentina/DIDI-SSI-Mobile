import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

/**
 * Representa un DID basado en ethereum, evitando confusion entre sus
 * representaciones como direccion ethereum y como DID.
 */
export class EthrDID {
	private address: string;

	private constructor(address: string) {
		this.address = address;
	}

	did() {
		return `did:ethr:${this.address}`;
	}

	keyAddress() {
		return this.address;
	}

	/**
	 * Construye un objecto EthrDID a partir de una direccion ethereum
	 * @throws {Error} si su parametro no es una direccion ethereum bien
	 * formada ("0x" + 40 caracteres hexadecimales)
	 */
	static fromKeyAddress(address: string): EthrDID {
		if (address.match("^0x[0-9A-Fa-f]{40}$") === null) {
			throw new Error(`${address} does not match expected EthrDID address format`);
		}
		return new EthrDID(address);
	}

	/**
	 * Construye un objecto EthrDID a partir de un DID string
	 * @throws {Error} si su parametro no es un did ethereum bien formado
	 * ("did:ethr:0x" + 40 caracteres hexadecimales)
	 */
	static fromDID(did: string): EthrDID {
		if (did.match("^did:ethr:0x[0-9A-Fa-f]{40}$") === null) {
			throw new Error(`${did} does not match expected EthrDID did format`);
		}

		const match = did.match("0x[0-9A-Fa-f]{40}");
		// This has to be here because of the first check
		const address = match![0];
		return new EthrDID(address);
	}

	/**
	 * Codificador entre string y EthrDID
	 */
	static codec = new t.Type<EthrDID, string, unknown>(
		"EthrDIDCodec",
		(x: unknown): x is EthrDID => x instanceof EthrDID,
		(u, c) =>
			either.chain(t.string.validate(u, c), s => {
				try {
					return t.success(EthrDID.fromDID(s));
				} catch (e) {
					return t.failure(u, c, (e as Error).message);
				}
			}),
		a => a.did()
	);
}
