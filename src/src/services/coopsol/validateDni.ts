import { CoopsolApiClient, IShareResp } from "@proyecto-didi/app-sdk";
import { AppConfig } from "../../AppConfig";
interface IReturnError {
    status: string | null;
    errorCode: string;
    message: string;
}

const Coopsol = (): CoopsolApiClient => new CoopsolApiClient(AppConfig.defaultServiceSettings.urlCoopsol);

export async function validateDniCoopsol( jwt: string): Promise<(IShareResp&{status:string})|IReturnError> {
	try {
		return Object.assign(await Coopsol().dniIdentity(jwt),{status:"IN_PROGRESS"});
	} catch (e) {
		return { 
			status: null,
			errorCode: "ADD_IMAGE",
			message: `${e}`,
		};
	}
}

