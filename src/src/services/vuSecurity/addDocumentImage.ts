import { ApiResult, VUSecurityApiClient } from "@proyecto-didi/app-sdk";
import { AppConfig } from "../../AppConfig";
import { createTokenAuthorization } from "../../presentation/util/appRouter";
import { ActiveDid } from "../../store/reducers/didReducer";

const VUSecurity = (): VUSecurityApiClient => new VUSecurityApiClient(AppConfig.defaultServiceSettings.urlSecurity);

export async function addDocumentImageFront(
	userName: string,
	operationId: string,
	file: string | undefined,
	did: ActiveDid,
	side = "front"
): ApiResult<string>|{} {
	let result;
	try {
		const token = await createTokenAuthorization(did);
		const r = VUSecurity().addDocumentImage(userName, operationId, side, file, token);
		return r;
	} catch (error) {
		result = { message: "Hubo un error al adherir la imagen documento" };
	}
	return result;
}
