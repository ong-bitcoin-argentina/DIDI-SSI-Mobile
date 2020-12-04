import { ApiResult } from "didi-sdk";
import { getClient } from "../internal/withDidiServerClient";

export async function savePresentation(jwts: any): ApiResult<any> {
	return getClient().savePresentation(jwts);
}
