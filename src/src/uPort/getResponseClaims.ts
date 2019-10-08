import { UPortDocument } from "../model/data/UPortDocument";
import { Claim, flattenClaim } from "./Claim";
import { SelectiveDisclosureRequest } from "./SelectiveDisclosureRequest";
import { Identity } from "../model/data/Identity";
import TypedObject from "../util/TypedObject";

function selectOwnClaims(request: SelectiveDisclosureRequest, identity: Identity): Claim {
	const result: Claim = {};
	for (const value of request.ownClaims) {
		switch (value) {
			case "name":
				result.name = identity.name;
			case "email":
				result.email = identity.email.value;
				break;
			case "image":
				// TODO: Handle image request
				break;
			case "country":
				result.country = identity.nationality.value;
				break;
			case "phone":
				result.phone = identity.cellPhone.value;
				break;
			default:
				break;
		}
	}
	return result;
}

function selectVerifiedClaims(
	request: SelectiveDisclosureRequest,
	documents: UPortDocument[]
): Array<{ selector: string; value?: UPortDocument }> {
	return request.verifiedClaims.map(selector => {
		const selected = documents.find(document => {
			const { root } = flattenClaim(document.claim.claims);
			return root === selector;
		});
		return { selector, value: selected };
	});
}

export function getResponseClaims(
	request: SelectiveDisclosureRequest,
	documents: UPortDocument[],
	identity: Identity
): { missing: string[]; own: Claim; verified: string[] } {
	const verified: { [selector: string]: UPortDocument } = {};
	const missing: string[] = [];

	selectVerifiedClaims(request, documents).forEach(vc => {
		if (vc.value) {
			verified[vc.selector] = vc.value;
		} else {
			missing.push(vc.selector);
		}
	});

	const own = selectOwnClaims(request, identity);
	return {
		missing,
		own: {
			...own,
			...TypedObject.mapValues(verified, v => {
				return v.claim.claims;
			})
		},
		verified: TypedObject.values(verified).map(d => d.jwt)
	};
}
