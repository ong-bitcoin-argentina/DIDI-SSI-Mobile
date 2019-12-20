import { createSelector } from "reselect";

import { assertUnreachable } from "../../util/assertUnreachable";
import TypedObject from "../../util/TypedObject";

import { LegalAddress, PersonalData, VisualData } from "../../model/Identity";

import { specialCredentialSelector } from "./credentialSelector";

export enum ValidationState {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected"
}

export interface WithValidationState<T> {
	value: T;
	state: ValidationState;
}

export interface ValidatedIdentity {
	visual: Partial<VisualData>;
	personalData: Partial<{ [K in keyof PersonalData]: WithValidationState<PersonalData[K]> }>;
	address: WithValidationState<Partial<LegalAddress>>;
}

function idFromEmail(email: string | undefined): string | undefined {
	if (!email) {
		return undefined;
	}
	const matches = email.match(new RegExp(`^[^@]+`, "g"));
	if (!matches || !matches[0]) {
		return undefined;
	}
	return matches[0];
}

export const combinedIdentitySelector = createSelector(
	specialCredentialSelector,
	st => st.persisted.userInputIdentity,
	(specials, userInputId) => {
		const identity: ValidatedIdentity = {
			address: {
				state: ValidationState.Pending,
				value: userInputId.address
			},
			visual: userInputId.visual,
			personalData: TypedObject.mapValues(userInputId.personalData, v => ({
				state: ValidationState.Pending,
				value: v
			}))
		};
		specials.forEach(data => {
			const special = data.specialFlag;
			switch (special.type) {
				case "EmailData":
					identity.personalData.email = {
						state: ValidationState.Approved,
						value: special.email
					};
					return;
				case "PhoneNumberData":
					identity.personalData.cellPhone = {
						state: ValidationState.Approved,
						value: special.phoneNumber
					};
					return;
				case "PersonalData":
					TypedObject.keys(special.data).forEach(key => {
						identity.personalData[key] = {
							state: ValidationState.Approved,
							value: special.data[key]
						};
					});
					return;
				case "LegalAddress":
					identity.address = {
						state: ValidationState.Approved,
						value: special.address
					};
					return;
				default:
					assertUnreachable(special);
			}
		});
		if ((identity.personalData.firstNames || identity.personalData.firstNames) && !identity.visual.name) {
			identity.visual.name = [identity.personalData.firstNames, identity.personalData.firstNames].join(" ");
		}
		if (identity.personalData.email && !identity.visual.id) {
			identity.visual.id = idFromEmail(identity.personalData.email.value);
		}
		return identity;
	}
);
