import { VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';


function VUSecurity(): VUSecurityApiClient {
    return new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity);
}

export async function registerUserVU(did: string,name: string, lastname: string) {    
    return await VUSecurity().registerUser(did, name, lastname);
}