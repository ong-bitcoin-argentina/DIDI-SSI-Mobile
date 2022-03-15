import { VUSecurityApiClient } from "@proyecto-didi/app-sdk";
import { AppConfig } from "../../AppConfig";
import { IReturnImage } from '../../model/VuDocumentImage';
import { createTokenAuthorization } from "../../presentation/util/appRouter";
import { ActiveDid } from "../../store/reducers/didReducer";

const VUSecurity = (): VUSecurityApiClient => new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity);

export async function addDocumentImage(
	userName: string,
	operationId: string,
	file: string,
	did: ActiveDid,
	side: string
): Promise<IReturnImage> {
	// let result;
	try {
		const token = await createTokenAuthorization(did);
		return await VUSecurity().addDocumentImage(userName, operationId, side, file, token);
	} catch (e) {
		return { 
			status: "camera-error",
			errorCode: "ADD_IMAGE",
			message: `${e}`,
		};
	}
	// return result;
}

