import { ApiResult, DidiServerApiClient } from "@proyecto-didi/app-sdk";
import { ApiInfo } from "@proyecto-didi/app-sdk/dist/src/model/apiInfo";
import { isRight, left, right } from "fp-ts/lib/Either";
import { AppConfig, PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
import { convertError } from "../common/convertError";


function getApiVersion(): ApiResult<ApiInfo> {
    return new DidiServerApiClient({ didiServerUri: AppConfig.defaultServiceSettings.didiUserServer }, PRIVATE_KEY_SEED_PASSWORD).getApiVersion();
}

export async function getAidiVersion() {
    const response = convertError(await getApiVersion());
    if (isRight(response)) {
        return response.right.aidiVersion;
    }
    return left(response.left);
}