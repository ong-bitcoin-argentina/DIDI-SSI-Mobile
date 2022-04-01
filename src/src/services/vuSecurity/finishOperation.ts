import { IReturnFinishOperation, VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function finishOperation(userName: string,operationId: string, did: ActiveDid ): Promise<IReturnFinishOperation> {    
    const token = await createTokenAuthorization(did);
    return VUSecurity().finishOperation(userName, operationId,token);
}