import { ApiResult } from "didi-sdk";
import { getClient } from "../internal/withDidiServerClient";

export async function savePresentation(jwts: any): ApiResult<any> {
	const data = await getClient().savePresentation(jwts);

	return data.right ? data.right.right : null;
}
