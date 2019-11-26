import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { Claim } from "../uPort/types/Claim";

export type SpecialCredentialFlag =
	| { type: "PhoneNumberData"; phoneNumber: string }
	| { type: "EmailData"; email: string }
	| { type: "None" };

const phoneCredentialCodec = t.type({ phoneNumber: t.string });

const emailCredentialCodec = t.type({ email: t.string });

export function extractSpecialCredentialData(claim: Claim): SpecialCredentialFlag {
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
	}

	return { type: "None" };
}
