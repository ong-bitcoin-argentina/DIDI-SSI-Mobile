import { JSONObject } from "../util/JSON";
import TypedObject from "../util/TypedObject";

import { ClaimData } from "../model/Claim";
import { CredentialDocument } from "../model/CredentialDocument";
import { Identity } from "../model/Identity";
import { RequestDocument } from "../model/RequestDocument";
import { ValidatedIdentity } from "../store/selector/combinedIdentitySelector";

import { getCredentials } from "./getCredentials";
import { SelectiveDisclosureRequest } from "./types/SelectiveDisclosureRequest";

function selectOwnClaims(request: SelectiveDisclosureRequest, identity: ValidatedIdentity): JSONObject {
	const result: ClaimData = {};
	function insert(key: string, value?: string) {
		if (value) {
			result[key] = value;
		}
	}

	for (const requested of request.ownClaims) {
		const key = requested;
		switch (key.toLowerCase()) {
			case "nombre":
			case "firstNames":
				insert(key, identity.personalData.firstNames?.value);
				break;
			case "apellido":
			case "lastNames":
				insert(key, identity.personalData.lastNames?.value);
				break;
			case "document":
				insert(key, identity.personalData.document?.value);
				break;
			case "name":
			case "full name":
				if (identity.personalData.firstNames && identity.personalData.lastNames) {
					insert(key, `${identity.personalData.firstNames.value} ${identity.personalData.lastNames.value}`);
				}
				break;
			case "email":
				insert(key, identity.personalData.email?.value);
				break;
			case "image":
				// TODO: Handle image request
				break;
			case "country":
			case "nationality":
				insert(key, identity.personalData.nationality?.value);
				break;
			case "cellPhone":
			case "phone":
				insert(key, identity.personalData.cellPhone?.value);
				break;
			case "street":
				insert(key, identity.address.value.street);
				break;
			case "addressNumber":
				insert(key, identity.address.value.number);
				break;
			case "department":
				insert(key, identity.address.value.department);
				break;
			case "floor":
				insert(key, identity.address.value.floor);
				break;
			case "neighborhood":
				insert(key, identity.address.value.neighborhood);
				break;
			case "postCode":
				insert(key, identity.address.value.postCode);
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
	identity: ValidatedIdentity
): { missing: string[]; own: JSONObject; verified: string[] } {
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
		own: {
			...own,
			...TypedObject.mapValues(verified, v => v.data)
		},
		verified: TypedObject.values(verified).map(d => d.jwt)
	};
}

export interface DisclosureResponseArguments {
	request: RequestDocument;
	identity: Identity;
	microCredentials: CredentialDocument[];
}

export async function signDisclosureResponse(
	request: RequestDocument,
	own: JSONObject,
	verified: string[]
): Promise<string> {
	const credentials = await getCredentials();
	const accessToken = await credentials.createDisclosureResponse({
		req: request.jwt,
		own,
		verified
	});
	return accessToken;
}
