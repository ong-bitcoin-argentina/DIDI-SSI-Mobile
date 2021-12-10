import { ApiResult, DidiServerApiClient, EthrDID } from "@proyecto-didi/app-sdk";
import { ActiveDid } from "../../store/reducers/didReducer";
import { getClient } from "../internal/withDidiServerClient";

export interface UserHasRondaArguments {
	api: DidiServerApiClient;
	address: string;
}

export async function userHasRonda(did: ActiveDid): ApiResult<any> {
	// @ts-expect-error did puede serEthrDID or null. Esperamos que sea EthrDID. TODO: Review
	return getClient().userHasRondaAccount(did);
}
