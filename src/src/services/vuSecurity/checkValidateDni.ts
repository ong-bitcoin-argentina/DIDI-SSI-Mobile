import { VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { IReturnCheckValidateDni } from '../../model/VuCheckValidateDni';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function checkValidateDniVU(did: ActiveDid): Promise<IReturnCheckValidateDni> {    
    const token = await createTokenAuthorization(did);
    try {
    return await VUSecurity().checkValidateDni(`${did?.did()}`,token); 
    } catch (error) {
        return { 
            status: "error",
            errorCode: "FIND_BY_ID",
            message: `${error}`,
            data: {
                status: "In Progress",
            }
        };
    }
}
