import {
	deriveCredentials,
	DerivedCredentialSource,
	DerivedCredential,
	issuanceDateTolerance
} from "../../src/model/DerivedCredential";
import { JSONValue } from "../../src/util/JSON";
import { VerifiedClaim } from "../../src/uPort/types/VerifiedClaim";

type Replacement = Omit<Partial<VerifiedClaim>, "type" | "claims">;

function wrapClaim(claims: Record<string, JSONValue>, replacement: Replacement = {}): DerivedCredentialSource {
	return {
		content: {
			type: "VerifiedClaim",
			subject: "sub",
			issuer: "iss",
			issuedAt: 1566412387,
			claims,
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

const time = wrapClaim({ test_course: timeClaims });
const course = wrapClaim({ test_course: courseClaims });
const identity = wrapClaim({ test_identity: identityClaims });
const combined = wrapClaim({ test: { ...courseClaims, ...identityClaims, ...timeClaims } });
const unrelated = wrapClaim({ unrelated: courseClaims });

describe(deriveCredentials, () => {
	function doExpect(sources: DerivedCredentialSource[], expected: Array<DerivedCredential<DerivedCredentialSource>>) {
		expect(deriveCredentials(sources)).toStrictEqual(expected);
	}

	it("should turn empty into empty", () => {
		doExpect([], []);
	});

	it("should merge part and whole, keeping part as a source", () => {
		const sources = [combined, identity];
		doExpect(sources, [{ content: combined.content, sources }]);
	});

	it("should merge some parts into less than the whole", () => {
		const sources = [time, course];
		const partialContent = wrapClaim({ ...time, ...course }).content;
		doExpect(sources, [{ content: partialContent, sources }]);
	});

	it("should merge all parts into whole", () => {
		const sources = [identity, course, time];
		doExpect(sources, [{ content: combined.content, sources }]);
	});

	it("should merge issuer date within tolerance", () => {
		const first = 1566412387;
		const second = first + issuanceDateTolerance - 1;

		const firstSource = wrapClaim(timeClaims, { issuedAt: first });
		const secondSource = wrapClaim(timeClaims, { issuedAt: second });

		doExpect(
			[firstSource, secondSource],
			[
				{ content: firstSource.content, sources: [firstSource] },
				{ content: secondSource.content, sources: [secondSource] }
			]
		);
	});

	function expectUnmergedWithReplacements(first: Replacement, second: Replacement) {
		const firstSource = wrapClaim(timeClaims, first);
		const secondSource = wrapClaim(timeClaims, second);

		doExpect(
			[firstSource, secondSource],
			[
				{ content: firstSource.content, sources: [firstSource] },
				{ content: secondSource.content, sources: [secondSource] }
			]
		);
	}

	it("should not merge different subjects", () => {
		expectUnmergedWithReplacements({ subject: "first" }, { subject: "second" });
	});

	it("should not merge different issuers", () => {
		expectUnmergedWithReplacements({ issuer: "first" }, { issuer: "second" });
	});

	it("should not merge issuer date beyond tolerance", () => {
		const first = 1566412387;
		const second = first + issuanceDateTolerance + 1;
		expectUnmergedWithReplacements({ issuedAt: first }, { issuedAt: second });
	});

	it("should not merge unrelated claim name", () => {
		doExpect(
			[combined, unrelated],
			[{ content: combined.content, sources: [combined] }, { content: unrelated.content, sources: [unrelated] }]
		);
	});
});
