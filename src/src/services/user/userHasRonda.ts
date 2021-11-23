import { ApiResult, DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";
import { getClient } from "../internal/withDidiServerClient";

export interface UserHasRondaArguments {
	api: DidiServerApiClient;
	address: string;
}

export async function userHasRonda(did: EthrDID): ApiResult<any> {
	return getClient().userHasRondaAccount(did);
}
