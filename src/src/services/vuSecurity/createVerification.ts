import { VUSecurityApiClient } from "@proyecto-didi/app-sdk";
import { AppConfig } from "../../AppConfig";
import { ActiveDid } from '../../store/reducers/didReducer';
import { getManufacturer, getSystemName, getSystemVersion, getDeviceName, getIpAddress } from 'react-native-device-info';
import { createTokenAuthorization } from '../../presentation/util/appRouter';
import { IReturnCreate } from '../../model/VuCreateVerification';
const VUSecurity = (): VUSecurityApiClient => new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity);
export async function createVerificationVU(
	activeDid: ActiveDid,
    name:string,
	lastname: string,
    deviceHash = "hash",
	rooted = false
	) : Promise<IReturnCreate> {
    const did = JSON.stringify(await activeDid?.did());
try {
	return await VUSecurity().createVerification(
		did.substring(1,did.length-1),
		`${name} ${lastname}`,
		deviceHash,
		rooted,
		getSystemName(),
		getSystemVersion(),
		await getManufacturer(),
		await getDeviceName(),
		await getIpAddress(),
		await createTokenAuthorization(activeDid),
	);	
} catch (error) {
	return { 
		status: "error",
		errorCode: "INITIAL_CREATION",
		message: `${error}`,
	};
}
}
