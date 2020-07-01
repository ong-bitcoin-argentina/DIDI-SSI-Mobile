import { EthrDID, ErrorData } from "didi-sdk";
import { buildComponentServiceCall, serviceCallSuccess, simpleAction } from "../common/componentServiceCall";
import { serviceErrors } from "../../presentation/resources/serviceErrors";
import { withExistingDid } from "../internal/withExistingDid";
import { serviceRequest } from "../common/serviceRequest";
import { Either, left, right } from "fp-ts/lib/Either";
import { AppConfig } from "../../AppConfig";

export interface UserCredentialsArguments {}

interface SemillasUser {
	accessToken: string;
}

interface DidIdResult {
	message: string;
}

interface GetCredentialsArguments {
	dni: string;
	did: EthrDID;
}

async function getCredentialDidi(args: GetCredentialsArguments): Promise<Either<ErrorData, DidIdResult>> {
	try {
		const semillasUser = AppConfig.defaultServiceSettings.semillasLogin;
		const user = await login(semillasUser.user, semillasUser.password);
		const didi = await getSemillasDidi(user.accessToken, args.did, args.dni);
		return right(didi);
	} catch (error) {
		console.log(error);
		return left(serviceErrors.common.FETCH_ERR);
	}
}

const getCredentialDidiComponent = buildComponentServiceCall(getCredentialDidi);
// TODO mover a archivo env
function login(username: string, password: string) {
	return serviceRequest<SemillasUser>(`${AppConfig.defaultServiceSettings.semillasServerUri}/auth/login`, {
		password,
		username
	});
}

function getSemillasDidi(token: string, did: EthrDID, dni: string) {
	return serviceRequest<DidIdResult>(
		`${AppConfig.defaultServiceSettings.semillasServerUri}/credentials/didi`,
		{
			did: did.did(),
			dni: dni
		},
		{
			Authorization: `Bearer ${token}`
		}
	);
}

export function getUserCredentials(serviceKey: string, dni: string) {
	return withExistingDid(serviceKey, { errorMessage: serviceErrors.login.NO_DID }, did => {
		return getCredentialDidiComponent(serviceKey, { did, dni }, result => {
			return simpleAction(serviceKey, { type: "SET_DID_DNI", value: result.message.length > 0 }, () => {
				return serviceCallSuccess(serviceKey);
			});
		});
	});
}
