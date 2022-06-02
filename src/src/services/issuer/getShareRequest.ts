import { DidiServerApiClient } from "@proyecto-didi/app-sdk";
import { AppConfig, PRIVATE_KEY_SEED_PASSWORD } from "../../AppConfig";
import { IShareRequestData } from '../../model/ShareRequest';

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


function removeBlockchainFromDid(did: string): string {
    const didAsArray = did.split(":");
    if (didAsArray.length === 3) return did;
    didAsArray.splice(2, 1);
    return didAsArray.join(":");
  }

export async function getShareRequest(idShareRequest: string[]): Promise<IShareRequestData[]|IReturnError>{
    try {
        const result = [];
        for (const iterator of idShareRequest) {
            const shareReq = (await shareRequest().getShareRequestFromId(iterator)).data;  
            shareReq.iss = removeBlockchainFromDid(shareReq.iss);
            result.push(shareReq)
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
