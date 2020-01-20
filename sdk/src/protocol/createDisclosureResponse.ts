import { JSONObject } from "../util/JSON";
import TypedObject from "../util/TypedObject";

import { ClaimData } from "../model/Claim";
import { CredentialDocument } from "../model/CredentialDocument";
import { Identity } from "../model/Identity";

import { SelectiveDisclosureRequest, VerifiableSpecIssuerSelector } from "./packets/SelectiveDisclosureRequest";

function selectOwnClaims(
	request: SelectiveDisclosureRequest,
	identity: Identity
): { ownClaims: ClaimData; missingRequired: string[] } {
	const ownClaims: ClaimData = {};
	const missingRequired: string[] = [];

	function insert(key: string, value: string | null | undefined) {
		if (value) {
			ownClaims[key] = value;
		}
	}

	Object.entries(request.ownClaims).forEach(([key, data]) => {
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
		if (ownClaims[key] === undefined && data.essential) {
			missingRequired.push(key);
		}
	});
	return { ownClaims, missingRequired };
}

function matchesIssuerSelector(document: CredentialDocument, selector: VerifiableSpecIssuerSelector): boolean {
	if (selector === undefined) {
		return true;
	}

	return selector.find(sel => sel.did.did() === document.issuer.did()) !== undefined;
}

function selectVerifiedClaims(
	request: SelectiveDisclosureRequest,
	documents: CredentialDocument[]
): { verifiedClaims: CredentialDocument[]; missingRequired: string[] } {
	const verifiedClaims: CredentialDocument[] = [];
	const missingRequired: string[] = [];

	Object.entries(request.verifiedClaims).forEach(([title, selector]) => {
		const selected = documents.find(
			document => title === document.title && matchesIssuerSelector(document, selector.iss)
		);
		if (selected) {
			verifiedClaims.push(selected);
		} else if (selector.essential) {
			missingRequired.push(title);
		}
	});

	return { verifiedClaims, missingRequired };
}

export function getResponseClaims(
	request: SelectiveDisclosureRequest,
	documents: CredentialDocument[],
	identity: Identity
): { missingRequired: string[]; ownClaims: JSONObject; verifiedClaims: CredentialDocument[] } {
	const verified = selectVerifiedClaims(request, documents);
	const own = selectOwnClaims(request, identity);

	return {
		missingRequired: [...own.missingRequired, ...verified.missingRequired],
		ownClaims: own.ownClaims,
		verifiedClaims: verified.verifiedClaims
	};
}
