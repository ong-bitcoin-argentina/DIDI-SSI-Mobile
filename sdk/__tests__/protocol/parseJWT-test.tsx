import { isLeft, isRight } from "fp-ts/lib/Either";

import { unverifiedParseJWT } from "../../src/protocol/parseJWT";

function parseUrl() {
	return unverifiedParseJWT("www.example.com");
}
function parseClaim() {
	return unverifiedParseJWT(
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpYXQiOjE1NjY0MTIzODcsInN1YiI6ImRpZDpldGhyOjB4NDYwZmVjMjNiZDUzNjEwYmY2ZDBlZDZjNmExYmVmNWVjODZlNzQwZCIsImNsYWltIjp7IkRpcGxvbWEiOnsiU2Nob29sIE5hbWUiOiJUaGUgVW5pdmVyc2l0eSBvZiB1UG9ydGxhbmRpYSIsIlByb2dyYW0gTmFtZSI6IkZyZW5jaCBsaW5ndWlzdGljcyIsIkdyYWR1YXRpb24gWWVhciI6IjIwMTkiLCJGaW5hbCBHcmFkZXMiOiJCKyJ9fSwidmMiOlsiL2lwZnMvUW1jMjVmRVluQWF5aTU1UDUyNncxVHRKWng0Z1pEb0RndGpIaHJDVUtDZkRTVSJdLCJjYWxsYmFja1VybCI6Imh0dHBzOi8vYXBpLnVwb3J0Lm1lL2NoYXNxdWkvdG9waWMvdXJiQTZMdVR0IiwiaXNzIjoiZGlkOmV0aHI6MHhmMjUzNTc1NzlmNjRlYjE0YjZiZGZlZmJjNzUyYmVhN2M3NzgxOWExIn0.XD3hnXz5ORzYLG7JTJnShkoP4-Ufzyltm75wEoWAb7Iu_frkLqdl-lD3caaD6bQ_7lYC3DzgiWEC9ic5wWr5jAE"
	);
}

describe(unverifiedParseJWT, () => {
	it("should error when parsing url", () => {
		expect(isLeft(parseUrl())).toBeTruthy();
	});
	it("should succeed when parsing jwt", () => {
		expect(isRight(parseClaim())).toBeTruthy();
	});
});
