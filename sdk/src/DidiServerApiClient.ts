import * as t from "io-ts";

import { commonServiceRequest } from "./util/commonServiceRequest";

import { EthrDID } from "./model/EthrDID";

export interface DidiServerApiClientConfiguration {
	/**
	 * URI de la instancia de didi-server a usar
	 * @example "http://didi.example.com/api/1.0/didi"
	 */
	didiServerUri: string;
}

const responseCodecs = {
	empty: t.type({}),

	singleCertificate: t.type({
		certificate: t.string
	}),

	accountRecovery: t.type({
		privateKeySeed: t.string
	}),

	validateDni: t.intersection([
		t.type({ operationId: t.string }),
		t.union([
			t.type({ status: t.literal("In Progress") }),
			t.type({ status: t.literal("Successful") }),
			t.intersection([t.type({ status: t.literal("Falied") }), t.partial({ errorMessage: t.string })])
		])
	])
};

export type ValidateDniResponseData = typeof responseCodecs.validateDni._A;

export class DidiServerApiClient {
	private baseUrl: string;

	constructor(config: DidiServerApiClientConfiguration) {
		this.baseUrl = config.didiServerUri;
	}

	changeEmail(did: EthrDID, validationCode: string, newEmail: string, password: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/changeEmail`, responseCodecs.singleCertificate, {
			did: did.did(),
			eMailValidationCode: validationCode,
			newEMail: newEmail,
			password
		});
	}

	changePassword(did: EthrDID, oldPassword: string, newPassword: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/changePassword`, responseCodecs.empty, {
			did: did.did(),
			oldPass: oldPassword,
			newPass: newPassword
		});
	}

	changePhoneNumber(did: EthrDID, validationCode: string, newPhoneNumber: string, password: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/changePhoneNumber`, responseCodecs.singleCertificate, {
			did: did.did(),
			phoneValidationCode: validationCode,
			newPhoneNumber,
			password
		});
	}

	checkValidateDni(did: EthrDID, operationId: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/renaper/validateDniState`, responseCodecs.validateDni, {
			did: did.did(),
			operationId
		});
	}

	recoverAccount(email: string, password: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/recoverAccount`, responseCodecs.accountRecovery, {
			eMail: email,
			password
		});
	}

	recoverPassword(email: string, validationCode: string, newPassword: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/recoverPassword`, responseCodecs.empty, {
			eMail: email,
			eMailValidationCode: validationCode,
			newPass: newPassword
		});
	}

	registerUser(
		did: EthrDID,
		data: {
			email: string;
			phoneNumber: string;
			password: string;
			privateKeySeed: string;
		}
	) {
		return commonServiceRequest("POST", `${this.baseUrl}/registerUser`, responseCodecs.empty, {
			did: did.did(),
			eMail: data.email,
			phoneNumber: data.phoneNumber,
			password: data.password,
			privateKeySeed: data.privateKeySeed
		});
	}

	/**
	 * @param cellPhoneNumber
	 * Un numero de telefono con codigo de pais y sin codigo de discado internacional
	 * @param idCheck
	 * Si se desea verificar que cellPhoneNumber esté asociado a un DID, el DID y password correspondiente
	 * @example
	 * apiClient.sendSmsValidator("+541100000000", {
	 * 	did: EthrDID.fromKeyAddress("0x0000000000000000000000000000000000000000"),
	 * 	password: "00000000"
	 * })
	 */
	sendSmsValidator(
		cellPhoneNumber: string,
		idCheck?: {
			did: EthrDID;
			password: string;
		}
	) {
		return commonServiceRequest("POST", `${this.baseUrl}/sendSmsValidator`, responseCodecs.empty, {
			cellPhoneNumber,
			...(idCheck && {
				did: idCheck.did.did(),
				password: idCheck.password
			})
		});
	}

	/**
	 * @param email
	 * @param idCheck
	 * Si se desea verificar que el email esté asociado a un DID, el DID y password correspondiente
	 * @example
	 * apiClient.sendEmailValidator("existing_user@example.com", {
	 * 	did: EthrDID.fromKeyAddress("0x0000000000000000000000000000000000000000"),
	 * 	password: "00000000"
	 * })
	 */
	sendMailValidator(
		email: string,
		idCheck?: {
			did: EthrDID;
			password: string;
		}
	) {
		return commonServiceRequest("POST", `${this.baseUrl}/sendMailValidator`, responseCodecs.empty, {
			eMail: email,
			...(idCheck && {
				did: idCheck.did.did(),
				password: idCheck.password
			})
		});
	}

	userLogin(did: EthrDID, email: string, password: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/userLogin`, responseCodecs.empty, {
			did: did.did(),
			eMail: email,
			password
		});
	}

	/**
	 * @param pictures
	 * Imagenes del documento y la persona que se validan, en formato JPG
	 * y encodeadas base64
	 */
	validateDni(
		did: EthrDID,
		data: {
			dni: string;
			gender: string;
			firstName: string;
			lastName: string;
			birthDate: string;
			order: string;
		},
		pictures: {
			front: string;
			back: string;
			selfie: string;
		}
	) {
		return commonServiceRequest("POST", `${this.baseUrl}/renaper/validateDni`, responseCodecs.validateDni, {
			did: did.did(),
			dni: data.dni,
			gender: data.gender,
			name: data.firstName,
			lastName: data.lastName,
			birthDate: data.birthDate,
			order: data.order,
			selfieImage: pictures.selfie,
			frontImage: pictures.front,
			backImage: pictures.back
		});
	}

	verifyEmailCode(did: EthrDID, validationCode: string, email: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/verifyMailCode`, responseCodecs.singleCertificate, {
			did: did.did(),
			validationCode,
			eMail: email
		});
	}

	verifySmsCode(did: EthrDID, validationCode: string, phoneNumber: string) {
		return commonServiceRequest("POST", `${this.baseUrl}/verifySmsCode`, responseCodecs.singleCertificate, {
			did: did.did(),
			validationCode,
			cellPhoneNumber: phoneNumber
		});
	}
}
