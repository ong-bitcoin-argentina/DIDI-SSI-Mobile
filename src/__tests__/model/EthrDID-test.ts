import { isLeft, isRight } from "fp-ts/lib/Either";

import { EthrDID } from "../../src/model/EthrDID";

describe(EthrDID, () => {
	it("should accept well formed keyAddress", () => {
		expect(isRight(EthrDID.fromKeyAddress("0x0123456789012345678901234567890123456789"))).toBeTruthy();
	});

	it("should accept well formed did", () => {
		expect(isRight(EthrDID.fromDID("did:ethr:0x0123456789012345678901234567890123456789"))).toBeTruthy();
	});

	it("should check did prefix", () => {
		expect(isLeft(EthrDID.fromDID("___:ethr:0x0123456789012345678901234567890123456789"))).toBeTruthy();
	});

	it("should check did method", () => {
		expect(isLeft(EthrDID.fromDID("did:web:0x0123456789012345678901234567890123456789"))).toBeTruthy();
	});

	it("should check length", () => {
		expect(isLeft(EthrDID.fromKeyAddress("0x123"))).toBeTruthy();
	});
});
