import { VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function cancelVerificationVU(userName: string,operationId: number,did: ActiveDid ) {    
    const token = await createTokenAuthorization(did);
    return VUSecurity().cancelVerification(userName, `${operationId}`,token);
}