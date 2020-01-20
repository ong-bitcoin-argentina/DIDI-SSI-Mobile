import { JSONObject } from "../util/JSON";
import TypedObject from "../util/TypedObject";

import { ClaimData } from "../model/Claim";
import { CredentialDocument } from "../model/CredentialDocument";
import { Identity } from "../model/Identity";

import { SelectiveDisclosureRequest } from "./packets/SelectiveDisclosureRequest";

function selectOwnClaims(request: SelectiveDisclosureRequest, identity: Identity): JSONObject {
	const result: ClaimData = {};
	function insert(key: string, value: string | null | undefined) {
		if (value) {
			result[key] = value;
		}
	}

	for (const requested of request.ownClaims) {
		const key = requested;
		switch (key.toLowerCase()) {
			case "nombre":
			case "firstNames":
				insert(key, identity.personalData.firstNames);
				break;
			case "apellido":
			case "lastNames":
				insert(key, identity.personalData.lastNames);
				break;
			case "document":
				insert(key, identity.personalData.document);
				break;
			case "name":
			case "full name":
				if (identity.personalData.firstNames && identity.personalData.lastNames) {
					insert(key, `${identity.personalData.firstNames} ${identity.personalData.lastNames}`);
				}
				break;
			case "email":
				insert(key, identity.personalData.email);
				break;
			case "image":
				// TODO: Handle image request
				break;
			case "country":
			case "nationality":
				insert(key, identity.personalData.nationality);
				break;
			case "cellPhone":
			case "phone":
				insert(key, identity.personalData.cellPhone);
				break;
			case "street":
				insert(key, identity.address.street);
				break;
			case "addressNumber":
				insert(key, identity.address.number);
				break;
			case "department":
				insert(key, identity.address.department);
				break;
			case "floor":
				insert(key, identity.address.floor);
				break;
			case "neighborhood":
				insert(key, identity.address.neighborhood);
				break;
			case "postCode":
				insert(key, identity.address.postCode);
				break;
			default:
				break;
		}
	}
	return result;
}

function selectVerifiedClaims(
	request: SelectiveDisclosureRequest,
	documents: CredentialDocument[]
): Array<{ selector: string; value?: CredentialDocument }> {
	return request.verifiedClaims.map(selector => {
		const selected = documents.find(document => document.title === selector);
		return { selector, value: selected };
	});
}

export function getResponseClaims(
	request: SelectiveDisclosureRequest,
	documents: CredentialDocument[],
	identity: Identity
): { missing: string[]; ownClaims: JSONObject; verifiedClaims: string[] } {
	const verified: { [selector: string]: CredentialDocument } = {};
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
		ownClaims: {
			...own,
			...TypedObject.mapValues(verified, v => v.data)
		},
		verifiedClaims: TypedObject.values(verified).map(d => d.jwt)
	};
}
