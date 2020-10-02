import { ApiResult, DidiServerApiClient, EthrDID } from "didi-sdk";
import { getClient } from "../internal/withDidiServerClient";

export interface UserHasRondaArguments {
	api: DidiServerApiClient;
	address: string;
}

export async function userHasRonda(address: string): ApiResult<any> {
	return getClient().userHasRondaAccount(address);
}
