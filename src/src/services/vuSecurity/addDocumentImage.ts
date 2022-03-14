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
	try {
		const token = await createTokenAuthorization(did);
		return VUSecurity().addDocumentImage(userName, operationId, side, file, token);
	} catch (e) {
		console.log('ERORORORORO');
		
		return { 
			status: "camera-error",
			message: "Hubo un error al adherir la imagen documento"
		};
	}
}

