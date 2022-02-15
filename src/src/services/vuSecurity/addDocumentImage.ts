import { ApiResult, VUSecurityApiClient} from '@proyecto-didi/app-sdk';
import { AppConfig } from '../../AppConfig';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const VUSecurity = ():VUSecurityApiClient => ( new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity));

export async function addDocumentImageFront(
    userName: string, 
    operationId: string,
    file: string | undefined, 
    did: ActiveDid, 
    side = 'front'): ApiResult<string> | string {  
      let result;
        try {
        const token = await createTokenAuthorization(did);
        console.log('ENTRAR 1 1');
        
        const r = VUSecurity().addDocumentImage(userName, operationId, side, file, token);
        console.log('EXITO 1 1');
        
        console.log(await r);
        return r;
      } catch (error) {
        result = 'Hubo un error al adherir la imagen documento';
      }    
      return result;
}
