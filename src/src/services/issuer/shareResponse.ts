import {IssuerApiClient} from '@proyecto-didi/app-sdk';
import { IShareResp } from '@proyecto-didi/app-sdk/dist/src/model/ShareResponse';
import { AppConfig } from '../../AppConfig';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


const Issuer = ():IssuerApiClient => ( new IssuerApiClient(AppConfig.defaultServiceSettings.urlIssuer));

export async function shareResponse(ActiveDid: ActiveDid, jwt: string ): Promise<IShareResp> {
    const token = await createTokenAuthorization(ActiveDid);
    const did = await ActiveDid?.did();
    return await Issuer().shareResponse(did,jwt,token);
}
