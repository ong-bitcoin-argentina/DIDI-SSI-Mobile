import { VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function cancelVerificationVU(userName: string,operationId: number) {     
    return await VUSecurity().cancelVerification(userName, `${operationId}`);
}