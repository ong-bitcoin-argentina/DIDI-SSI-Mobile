import { DidiServerApiClient, EthrDID, ErrorData } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";
import { serviceRequest } from "../common/serviceRequest";
import { Either, left, right } from "fp-ts/lib/Either";

export interface UserCredentialsArguments {}

interface SemillasUser {
	accessToken: string;
}

interface DidIdResult {
	message: string;
}

async function getCredentialDidi(args: { errorMessage?: ErrorData }): Promise<Either<ErrorData, DidIdResult>> {
	try {
		const user = await login("admin", "admin@atixlabs");
		const didi = await getSemillasDidi(user.accessToken);
		return right(didi);
	} catch (error) {
		return left(args.errorMessage || serviceErrors.common.FETCH_ERR);
	}
}

const getCredentialDidiComponent = buildComponentServiceCall(getCredentialDidi);

function login(username: string, password: string) {
	return serviceRequest<SemillasUser>("https://api.staging.semillas.atixlabs.com/auth/login", {
		password,
		username
	});
}

function getSemillasDidi(token: string) {
	return serviceRequest<DidIdResult>(
		"https://api.staging.semillas.atixlabs.com/credentials/didi",
		{},
		{
			Authorization: `Bearer ${token}`
		}
	);
}

export function getUserCredentials(serviceKey: string) {
	//return getCredentialDidiComponent(serviceKey, {}, result => {
	return simpleAction(serviceKey, { type: "SET_DID_DNI", value: true }, () => {
		return serviceCallSuccess(serviceKey);
	});
	//});
}
