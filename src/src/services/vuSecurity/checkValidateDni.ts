import { VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { IReturnCheckValidateDni } from '../../model/VuCheckValidateDni';
import { tokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function checkValidateDniVU(did: ActiveDid): Promise<IReturnCheckValidateDni> {    
    try {
    const token = await tokenAuthorization(did);
    const {address} = await did;
    return await VUSecurity().checkValidateDni(`did:ethr:${address}`,token); 
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
