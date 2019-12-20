import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { Claim } from "./Claim";
import { LegalAddress, PersonalIdentityData } from "./Identity";

export type SpecialCredentialFlag =
	| { type: "PhoneNumberData"; phoneNumber: string }
	| { type: "EmailData"; email: string }
	| { type: "PersonalData"; data: PersonalIdentityData }
	| { type: "LegalAddress"; address: Partial<LegalAddress> };

const stringOrNumberCodec = t.union([t.string, t.number]).pipe(
	new t.Type<string, string | number, string | number>(
		"stringOrNumberCodec",
		t.string.is,
		(u, c) => t.success(u.toString()),
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
	streetAddress: t.string,
	numberStreet: stringOrNumberCodec,
	floor: stringOrNumberCodec,
	department: t.string,
	zipCode: stringOrNumberCodec,
	city: t.string,
	municipality: t.string,
	province: t.string,
	country: t.string
});

export const SpecialCredentialFlag = {
	extract: (claim: Claim): SpecialCredentialFlag | undefined => {
		switch (claim.title) {
			case "Phone":
				const phone = phoneCredentialCodec.decode(claim.data);
				if (isRight(phone)) {
					return { type: "PhoneNumberData", phoneNumber: phone.right.phoneNumber };
				}
				break;

			case "Email":
				const email = emailCredentialCodec.decode(claim.data);
				if (isRight(email)) {
					return { type: "EmailData", email: email.right.email };
				}
				break;

			case "Datos Personales":
				const personalData = personalDataCredentialCodec.decode(claim.data);
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
				const legalAddress = legalAddressCredentialCodec.decode(claim.data);
				if (isRight(legalAddress)) {
					return {
						type: "LegalAddress",
						address: {
							department: legalAddress.right.department,
							floor: legalAddress.right.floor,
							number: legalAddress.right.numberStreet,
							postCode: legalAddress.right.zipCode,
							street: legalAddress.right.streetAddress,
							neighborhood: legalAddress.right.city
						}
					};
				}
				break;
		}

		return undefined;
	}
};
