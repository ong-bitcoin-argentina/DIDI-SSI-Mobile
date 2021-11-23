import { ApiResult } from "@proyecto-didi/app-sdk";
import { getClient } from "../internal/withDidiServerClient";

export async function saveShareRequest(userJWT: string, sharingJWT: string): ApiResult<{ data: string }> {
	return await getClient().saveShareRequest(userJWT, sharingJWT);
}
