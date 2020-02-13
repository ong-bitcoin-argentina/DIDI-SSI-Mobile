import { Identity, LegalAddress, PersonalIdentityData } from "didi-sdk";
import { createSelector } from "reselect";

import { assertUnreachable } from "../../util/assertUnreachable";
import { liftUndefined } from "../../util/liftUndefined";
import { Nullable } from "../../util/Nullable";
import TypedObject from "../../util/TypedObject";

import { activeSpecialCredentialsSelector } from "./credentialSelector";

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
	id?: string;
	name?: string;
	image?: Identity["image"];

	cellPhone?: WithValidationState<NonNullable<Identity["cellPhone"]>>;
	email?: WithValidationState<NonNullable<Identity["email"]>>;
	personalData: Partial<{ [K in keyof PersonalIdentityData]: WithValidationState<PersonalIdentityData[K]> }>;
	address: WithValidationState<Partial<Nullable<LegalAddress>>>;
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
	activeSpecialCredentialsSelector,
	st => st.persisted.userInputIdentity,
	(credentials, userInputId) => {
		const identity: ValidatedIdentity = {
			image: userInputId.image,
			cellPhone: liftUndefined(userInputId.cellPhone, value => ({
				state: ValidationState.Pending,
				value
			})),
			email: liftUndefined(userInputId.email, value => ({
				state: ValidationState.Pending,
				value
			})),
			address: {
				state: ValidationState.Pending,
				value: userInputId.address
			},
			personalData: TypedObject.mapValues(userInputId.personalData, v => ({
				state: ValidationState.Pending,
				value: v
			}))
		};

		TypedObject.keys(credentials).forEach(type => {
			const special = credentials[type]?.specialFlag;
			if (special?.type === undefined) {
				return;
			}
			switch (special.type) {
				case "EmailData":
					identity.email = {
						state: ValidationState.Approved,
						value: special.email
					};
					return;
				case "PhoneNumberData":
					identity.cellPhone = {
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

		if (identity.personalData.firstNames && identity.personalData.lastNames) {
			identity.name = [identity.personalData.firstNames.value, identity.personalData.lastNames.value].join(" ");
		} else if (identity.email) {
			identity.name = idFromEmail(identity.email.value);
		}
		if (identity.email && !identity.id) {
			identity.id = idFromEmail(identity.email.value);
		}
		return identity;
	}
);

export const identitySelector = createSelector(
	combinedIdentitySelector,
	(validatedIdentity): Identity => ({
		image: validatedIdentity.image,
		cellPhone: validatedIdentity.cellPhone?.value,
		email: validatedIdentity.email?.value,
		address: TypedObject.mapValues(validatedIdentity.address.value, value => (value === null ? undefined : value)),
		personalData: TypedObject.mapValues(validatedIdentity.personalData, value => value?.value)
	})
);
