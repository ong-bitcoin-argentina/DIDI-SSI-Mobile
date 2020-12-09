import { ApiResult, DidiServerApiClient } from "didi-sdk";
import { getClient } from "../internal/withDidiServerClient";

export interface UserHasRondaArguments {
	api: DidiServerApiClient;
	address: string;
}

export async function saveShareRequest(userJWT: string, sharingJWT: string): ApiResult<{ data: string }> {
	return await getClient().saveShareRequest(userJWT, sharingJWT);
}
