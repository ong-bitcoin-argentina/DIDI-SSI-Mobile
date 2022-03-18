import { VUSecurityApiClient } from "@proyecto-didi/app-sdk";
import { AppConfig } from "../../AppConfig";
import { ActiveDid } from '../../store/reducers/didReducer';
import { getManufacturer, getSystemName, getSystemVersion, getDeviceName } from 'react-native-device-info';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { IReturnCreate } from '../../model/VuCreateVerification';
const VUSecurity = (): VUSecurityApiClient => new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity);
export interface Response {
    operationId: number;
    userName: string;
   
}

export async function createVerificationVU(
	activeDid: ActiveDid,
    name:string,
	lastname: string,
    deviceHash = "hash",
	rooted = false
	) : Promise<IReturnCreate> {
    const userName = `${name} ${lastname}`
    const did = JSON.stringify(await activeDid?.did());
	const operativeSystem=  getSystemName();
	const operativeSystemVersion= getSystemVersion();
	const deviceManufacturer= await getManufacturer();
	const deviceName = await getDeviceName();
	const token = await createTokenAuthorization(activeDid);
	return await VUSecurity().createVerification(
		did.substring(1,did.length-1),
		userName,
		deviceHash,
		rooted,
		operativeSystem,
		operativeSystemVersion,
		deviceManufacturer,
		deviceName,
		token,
	);
}
