import { Either, either, isRight, left, right, tryCatch } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { ErrorData, serviceErrors } from "../../services/common/serviceErrors";

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

	static fromKeyAddress(address: string): Either<ErrorData, EthrDID> {
		if (address.match("^0x[0-9A-Fa-f]{40}$") !== null) {
			return right(new EthrDID(address));
		} else {
			return left(serviceErrors.did.PARSE_ADDRESS(address));
		}
	}

	static fromDID(did: string): Either<ErrorData, EthrDID> {
		if (did.match("^did:ethr:0x[0-9A-Fa-f]{40}$") === null) {
			return left(serviceErrors.did.PARSE_DID(did));
		}

		const match = did.match("0x[0-9A-Fa-f]{40}");
		// This has to be here because of the first check
		const address = match![0];
		return right(new EthrDID(address));
	}
}

export const EthrDIDCodec = new t.Type<EthrDID, string, unknown>(
	"EthrDIDCodec",
	(x: unknown): x is EthrDID => x instanceof EthrDID,
	(u, c) =>
		either.chain(t.string.validate(u, c), s => {
			const parse = EthrDID.fromDID(s);
			if (isRight(parse)) {
				return parse;
			} else {
				return t.failure(u, c, parse.left.message);
			}
		}),
	a => a.did()
);
