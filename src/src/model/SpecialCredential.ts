import { isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

import { Claim } from "../uPort/types/Claim";

export type SpecialCredentialFlag =
	| { type: "PhoneNumberData"; phoneNumber: string }
	| { type: "EmailData"; email: string }
	| { type: "None" };

const phoneCredentialCodec = t.type({ phoneCredential: t.type({ phoneNumber: t.string }) });

const emailCredentialCodec = t.type({ emailCredential: t.type({ email: t.string }) });

export function extractSpecialCredentialData(claim: Claim): SpecialCredentialFlag {
	const phone = phoneCredentialCodec.decode(claim);
	if (isRight(phone)) {
		return { type: "PhoneNumberData", phoneNumber: phone.right.phoneCredential.phoneNumber };
	}

	const email = emailCredentialCodec.decode(claim);
	if (isRight(email)) {
		return { type: "EmailData", email: email.right.emailCredential.email };
	}

	return { type: "None" };
}
