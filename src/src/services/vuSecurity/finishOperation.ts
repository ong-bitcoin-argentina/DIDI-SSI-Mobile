import {VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { IFinishOperation } from '../../model/VuFinishOperation';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function finishOperation(userName: string,operationId: string, did: ActiveDid ): Promise<IFinishOperation> {    
    const token = await createTokenAuthorization(did);
    try {
        return await VUSecurity().finishOperation(userName, operationId,token);     
    } catch (error) {
        return { 
            status: "error",
            errorCode: "END_OPERATION",
            message: `${error}`,
        };
    }
}
