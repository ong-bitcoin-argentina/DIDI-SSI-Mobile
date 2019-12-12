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
	for (const value of request.ownClaims) {
		switch (value) {
			case "name":
				if (identity.personalData.fullName) {
					result.name = identity.personalData.fullName.value;
				}
				break;
			case "email":
				if (identity.personalData.email) {
					result.email = identity.personalData.email.value;
				}
				break;
			case "image":
				// TODO: Handle image request
				break;
			case "country":
				if (identity.personalData.nationality) {
					result.country = identity.personalData.nationality.value;
				}
				break;
			case "phone":
				if (identity.personalData.cellPhone) {
					result.phone = identity.personalData.cellPhone.value;
				}
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
		const selected = documents.find(document => document.content.claims.title === selector);
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
			...TypedObject.mapValues(verified, v => {
				return v.content.claims.data;
			})
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
