import { ApiResult } from "didi-sdk";
import { getClient } from "../internal/withDidiServerClient";

export interface GetShareRequestArguments {
	token: string,
	idShareRequest: string;
}

export async function getShareRequest(token: string, idShareRequest: string): ApiResult<any> {
	return getClient().getShareRequestFromServer(token, idShareRequest);
}
