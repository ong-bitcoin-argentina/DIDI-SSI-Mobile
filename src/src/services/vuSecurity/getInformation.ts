import {VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { IReturnGetInformation } from '../../model/VuGetInformation';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function getInformation(userName: string,operationId: string, did: ActiveDid ): Promise<IReturnGetInformation> {    
    const token = await createTokenAuthorization(did);
    return VUSecurity().getInformation(userName, operationId,token);
}