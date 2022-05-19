import { DidiServerApiClient } from "@proyecto-didi/app-sdk";
import { IIssuerShareRequest } from '@proyecto-didi/app-sdk/dist/src/model/ShareRequests';
import { AppConfig, PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";

export interface IReturnError {
    status?:    string;
    errorCode?: string;
    message?:   string;
}

function shareRequest(): DidiServerApiClient {
	return new DidiServerApiClient(
		{ didiServerUri: AppConfig.defaultServiceSettings.didiUserServer },
		PRIVATE_KEY_SEED_PASSWORD
	);
}

export async function getShareRequest(idShareRequest: string[]): Promise<IIssuerShareRequest[]|IReturnError>{
    try {
        const result = [];
		for (let i = 0; i < idShareRequest.length; i++) {
            result.push(await shareRequest().getShareRequestFromId(idShareRequest[i]))
		}        
        return result;
    } catch (e) {
        return { 
			status: "error",
			errorCode: "GET_SHARE_REQUEST",
			message: `${e}`,
		};
    }
}
