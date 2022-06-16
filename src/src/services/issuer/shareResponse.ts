import {IssuerApiClient} from '@proyecto-didi/app-sdk';
import { IShareResp } from '@proyecto-didi/app-sdk/dist/src/model/ShareResponse';
import { AppConfig } from '../../AppConfig';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { ActiveDid } from '../../store/reducers/didReducer';


function IssuerApi(): IssuerApiClient {
    return new IssuerApiClient(AppConfig.defaultServiceSettings.urlIssuer)
}

export async function shareResponse(activeDid: ActiveDid, jwt: string ): Promise<IShareResp> {
    const token = await createTokenAuthorization(activeDid);
    const did = await activeDid?.did();
    return IssuerApi().shareResponse(did,jwt,token);
}
