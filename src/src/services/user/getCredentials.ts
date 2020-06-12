import { DidiServerApiClient, EthrDID } from "didi-sdk";

import { buildComponentServiceCall, serviceCallSuccess } from "../common/componentServiceCall";
import { convertError } from "../common/convertError";

import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { getState } from "../internal/getState";
import { withDidiServerClient } from "../internal/withDidiServerClient";
import { withExistingDid } from "../internal/withExistingDid";

export interface UserCredentialsArguments {}

// const getUserCredentialsComponent = buildComponentServiceCall(async (args: UserCredentialsArguments) => ({}));

export function getUserCredentials(serviceKey: string) {
	return serviceCallSuccess(serviceKey);
}
