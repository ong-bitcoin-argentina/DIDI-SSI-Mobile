import { Right } from "fp-ts/lib/Either";

import { deriveCredentials, DerivedCredentialSource, issuanceDateTolerance } from "../../src/model/DerivedCredential";
import { Claim } from "../../src/uPort/types/Claim";
import { EthrDID } from "../../src/uPort/types/EthrDID";
import { ClaimMetadata } from "../../src/uPort/types/VerifiedClaim";

function unsafeCreateDID(keyAddress: string): EthrDID {
	return (EthrDID.fromKeyAddress(keyAddress) as Right<EthrDID>).right;
}

const metadata: ClaimMetadata = {
	subject: unsafeCreateDID("0x0123456789012345678901234567890123456789"),
	issuer: unsafeCreateDID("0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd"),
	issuedAt: 1566412387
};

const firstDid = unsafeCreateDID("0x0246802468024680246802468024680246802468");
const secondDid = unsafeCreateDID("0x1357913579135791357913579135791357913579");

type Replacement = Partial<ClaimMetadata>;

function wrapClaim(claims: Claim, replacement: Replacement = {}): DerivedCredentialSource {
	return {
		content: {
			type: "VerifiedClaim",
			claims,
			...metadata,
			...replacement
		}
	};
}
const timeClaims = {
	fecha_inicio: "28-06-2019",
	fecha_fin: "28-09-2019"
};
const courseClaims = {
	curso: "Carpinteria",
	duracion: "3 meses"
};
const identityClaims = {
	nombre: "Pedro",
	apellido: "Picapiedras"
};
const combinedClaims = { ...courseClaims, ...identityClaims, ...timeClaims };
const unrelatedClaims = courseClaims;

const time = wrapClaim(new Claim("test_course", timeClaims));
const course = wrapClaim(new Claim("test_course", courseClaims));
const identity = wrapClaim(new Claim("test_identity", identityClaims));
const combined = wrapClaim(new Claim("test", combinedClaims));
const unrelated = wrapClaim(new Claim("unrelated", unrelatedClaims));

describe(deriveCredentials, () => {
	function doExpect(sources: DerivedCredentialSource[], expected: ReturnType<typeof deriveCredentials>) {
		expect(deriveCredentials(sources)).toStrictEqual(expected);
	}

	it("should turn empty into empty", () => {
		doExpect([], []);
	});

	it("should merge part and whole, keeping part as a source", () => {
		const sources = [combined, identity];
		doExpect(sources, [{ data: metadata, rootClaim: "test", claims: combinedClaims, sources }]);
	});

	it("should merge some parts into less than the whole", () => {
		const sources = [time, course];
		const partialClaim = { ...timeClaims, ...courseClaims };
		doExpect(sources, [{ data: metadata, rootClaim: "test", claims: partialClaim, sources }]);
	});

	it("should merge all parts into whole", () => {
		const sources = [identity, course, time];
		doExpect(sources, [{ data: metadata, rootClaim: "test", claims: combinedClaims, sources }]);
	});

	it("should merge issuer date within tolerance", () => {
		const first = 1566412387;
		const second = first - issuanceDateTolerance + 1;

		const firstSource = wrapClaim(new Claim("test", timeClaims), { issuedAt: first });
		const secondSource = wrapClaim(new Claim("test", timeClaims), { issuedAt: second });

		doExpect(
			[firstSource, secondSource],
			[{ data: metadata, rootClaim: "test", claims: timeClaims, sources: [firstSource, secondSource] }]
		);
	});

	function expectUnmergedWithReplacements(first: Replacement, second: Replacement) {
		const firstSource = wrapClaim(new Claim("test", timeClaims), first);
		const secondSource = wrapClaim(new Claim("test", timeClaims), second);

		doExpect(
			[firstSource, secondSource],
			[
				{ data: { ...metadata, ...first }, rootClaim: "test", claims: timeClaims, sources: [firstSource] },
				{ data: { ...metadata, ...second }, rootClaim: "test", claims: timeClaims, sources: [secondSource] }
			]
		);
	}

	it("should not merge different subjects", () => {
		expectUnmergedWithReplacements({ subject: firstDid }, { subject: secondDid });
	});

	it("should not merge different issuers", () => {
		expectUnmergedWithReplacements({ issuer: firstDid }, { issuer: secondDid });
	});

	it("should not merge issuer date beyond tolerance", () => {
		const first = 1566412387;
		const second = first + issuanceDateTolerance + 1;
		expectUnmergedWithReplacements({ issuedAt: first }, { issuedAt: second });
	});

	it("should not merge unrelated claim name", () => {
		doExpect(
			[combined, unrelated],
			[
				{ data: metadata, rootClaim: "test", claims: combinedClaims, sources: [combined] },
				{ data: metadata, rootClaim: "unrelated", claims: unrelatedClaims, sources: [unrelated] }
			]
		);
	});
});
