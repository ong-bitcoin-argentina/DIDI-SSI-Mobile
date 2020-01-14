import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { Nullable } from "../util/Nullable";

import { ClaimData } from "./Claim";
import { LegalAddress, PersonalIdentityData } from "./Identity";

export type SpecialCredentialFlag =
	| { type: "PhoneNumberData"; phoneNumber: string }
	| { type: "EmailData"; email: string }
	| { type: "PersonalData"; data: PersonalIdentityData }
	| { type: "LegalAddress"; address: Nullable<LegalAddress> };

const stringOrNumberCodec = t.union([t.string, t.number]).pipe(
	new t.Type<string, string | number, string | number>(
		"stringOrNumberCodec",
		t.string.is,
		(u, c) => t.success(u.toString()),
		a => a
	)
);

const optionalStringOrNumberCodec = t.union([stringOrNumberCodec, t.null, t.undefined]).pipe(
	new t.Type<string | null, string | null | undefined, string | null | undefined>(
		"optionalStringOrNumberCodec",
		t.string.is,
		(u, c) => t.success(typeof u === "string" ? u : null),
		a => a
	)
);

const phoneCredentialCodec = t.type({
	phoneNumber: stringOrNumberCodec
});

const emailCredentialCodec = t.type({
	email: t.string
});

const personalDataCredentialCodec = t.type({
	dni: stringOrNumberCodec,
	names: t.string,
	lastNames: t.string,
	nationality: t.string
});

const legalAddressCredentialCodec = t.partial({
	streetAddress: optionalStringOrNumberCodec,
	numberStreet: optionalStringOrNumberCodec,
	floor: optionalStringOrNumberCodec,
	department: optionalStringOrNumberCodec,
	zipCode: optionalStringOrNumberCodec,
	city: optionalStringOrNumberCodec,
	municipality: optionalStringOrNumberCodec,
	province: optionalStringOrNumberCodec,
	country: optionalStringOrNumberCodec
});

export const SpecialCredentialFlag = {
	extract: (title: string, claim: ClaimData): SpecialCredentialFlag | undefined => {
		switch (title) {
			case "Phone":
				const phone = phoneCredentialCodec.decode(claim);
				if (isRight(phone)) {
					return { type: "PhoneNumberData", phoneNumber: phone.right.phoneNumber };
				}
				break;

			case "Email":
				const email = emailCredentialCodec.decode(claim);
				if (isRight(email)) {
					return { type: "EmailData", email: email.right.email };
				}
				break;

			case "Datos Personales":
				const personalData = personalDataCredentialCodec.decode(claim);
				if (isRight(personalData)) {
					return {
						type: "PersonalData",
						data: {
							document: personalData.right.dni,
							firstNames: personalData.right.names,
							lastNames: personalData.right.lastNames,
							nationality: personalData.right.nationality
						}
					};
				}
				break;

			case "Domicilio Legal":
				const legalAddress = legalAddressCredentialCodec.decode(claim);
				if (isRight(legalAddress)) {
					return {
						type: "LegalAddress",
						address: {
							department: legalAddress.right.department ?? null,
							floor: legalAddress.right.floor ?? null,
							number: legalAddress.right.numberStreet ?? null,
							postCode: legalAddress.right.zipCode ?? null,
							street: legalAddress.right.streetAddress ?? null,
							neighborhood: legalAddress.right.city ?? null
						}
					};
				}
				break;
		}

		return undefined;
	}
};
