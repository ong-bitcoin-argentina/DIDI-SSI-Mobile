import {IssuerApiClient} from '@proyecto-didi/app-sdk';
import { IShareResp } from '@proyecto-didi/app-sdk/dist/src/model/ShareResponse';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';



export async function shareResponse(activeDid: ActiveDid, jwt: string , urlIssuer: string): Promise<IShareResp> {
    try {
    const IssuerApi = new IssuerApiClient(urlIssuer)
    const token = await createTokenAuthorization(activeDid);
    const did = await activeDid?.did();
    return await IssuerApi.shareResponse(did,jwt,token);   
    } catch (error) {
        return {
            status:'error',
            data: {
              code:"TypeError",
              message: `${error}`
            }
        }
    }
}
