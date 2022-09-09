import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { getSignerForHDPath } from "react-native-uport-signer";
import { Credentials } from "uport-credentials";
import { DIDI_SERVER_DID, URL_DOMAIN, URL_SERVICE_LOGINSUCCESS, URL_SERVICE_LOGINDENIED, URL_APP } from "../../AppConfig";
import { EthrDID } from "@proyecto-didi/app-sdk";
import DeepLinking from "react-native-deep-linking";
import { NavigationActions } from "react-navigation";
import { ActiveDid } from "../../store/reducers/didReducer";
interface Settings {
	did?: string;
	signer?: any;
}

interface Link {
	url: string;
}

const getDidAddress = (did: EthrDID) => {
	const cleanDid = did.did().split(":");
	return cleanDid[cleanDid.length - 1];
};

export enum links {
	login = "aidi://login",
	credentials = `aidi://credentials/ronda`
}

export const successfullyLogged = async (token: string) => {
	const params = {
		dynamicLink: `${URL_DOMAIN}?link=${URL_SERVICE_LOGINSUCCESS}?token=${token}&apn=${URL_APP}`,
		deppLink: `ronda://loginSuccess?token=${token}`
	};
	await openApp(params);
};

export const loginDenied = async () => {
	const params = {
		dynamicLink: `${URL_DOMAIN}?link=${URL_SERVICE_LOGINDENIED}&apn=${URL_APP}`,
		deppLink: `ronda://loginDenied`
	};
	await openApp(params);
};

export const openApp = async (args: { dynamicLink: string; deppLink: string }) => {
	const { deppLink, dynamicLink } = args;
	const canOpenURL = await Linking.canOpenURL(deppLink);
	if (canOpenURL) Linking.openURL(deppLink);
	else Linking.openURL(dynamicLink);
};

export const deepLinkHandler = (myHandler: (link: Link) => void) => {
	Linking.getInitialURL().then(myHandler);
	Linking.addEventListener("url", myHandler);
	return () => {
		Linking.removeEventListener("url", e => console.log("url", e));
	};
};

export const dynamicLinkHandler = (myHandler: (link: Link) => void) => {
	dynamicLinks().getInitialLink().then(myHandler);
	const unsubscribe = dynamicLinks().onLink(myHandler);
	return () => unsubscribe();
};

export const askedForLogin = (link: Link) => link?.url?.match(/login/);
export const navigateToCredentials = (link: Link) => link?.url?.match(/credentials/);

export const initializeDeepLinking = () => {
	DeepLinking.addScheme("aidi://");
	Linking.addEventListener("url", handleUrl);
	DeepLinking.addRoute("/login");
	DeepLinking.addRoute("/credentials");
	const url = Linking.getInitialURL()
		.then(url => url && Linking.openURL(url))
		.catch(err => console.error("An error occurred", err));
};

export const removeDeepLinkListener = () => {
	Linking.removeEventListener("url", handleUrl);
};

export const handleUrl = ({ url }) => {
	Linking.canOpenURL(url).then(supported => {
		if (supported) {
			DeepLinking.evaluateUrl(url);
		}
	});
};

export const handleCredentialDeepLink = (navigation: any) => {
	const navigateAction = NavigationActions.navigate({
		routeName: "DashboardDocuments",
		action: NavigationActions.navigate({
			routeName: "DocumentsFinance"
		})
	});
	navigation.dispatch(navigateAction);
};

export const createToken = async (did: ActiveDid):Promise<string| null> => {
	if (!did || !did.did) {
		return null;
	}
	const credentialsParams: Settings = {};
	credentialsParams.signer = getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = did.did();
	const cred = new Credentials(credentialsParams);
	return cred.createVerification({
		sub: DIDI_SERVER_DID, //Address of receiver of the verification
		claim: { name: "Ronda" }
	});
};



export const createTokenAuthorization = async (did: ActiveDid):Promise<string> => {
	if (!did || !did.did) {
		return 'null';
	}	
	const credentialsParams: Settings = {};
	credentialsParams.signer = getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = did.did();
	const cred = new Credentials(credentialsParams);
	return cred.createVerification({
		"iss": did.did()
	});

};



export const tokenAuthorization = async (did: ActiveDid):Promise<string> => {
	const {address} = did;
	const didEthr = `did:ethr:${address}`
	const credentialsParams: Settings = {};
	credentialsParams.signer = getSignerForHDPath(address);
	credentialsParams.did = didEthr;
	const cred = new Credentials(credentialsParams);
	return cred.createVerification({
		"iss": didEthr
	});
};

interface IData {
	dni: string,
	email: string,
	lastName: string,
	name: string,
	phone: string,
} 
export const createTokenCoopsol = async (did: ActiveDid, data:IData):Promise<string|null> => {
	if (!did || !did.did) {
		return null;
	}
	const credentialsParams: Settings = {};
	credentialsParams.signer = getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = did.did();
	const cred = new Credentials(credentialsParams);
	return cred.signJWT({
		// "iat": 1658268440,
		"sub": did.did(),
		"vc": {
		"@context": [
			"https://www.w3.org/2018/credentials/v1"
		],
		"type": [
			"VerifiableCredential"
		],
		"credentialSubject": {
			"Datos Personales": {
			"category": "identity",
			"preview": {
				"type": 2,
				"fields": [
				"Numero de Identidad",
				"Nombre(s)",
				"Apellido(s)",
				"Nacionalidad",
				"Correo",
				"Numero de Celular"
				],
				"cardLayout": null
			},
			"data": {
				"Credencial": "Datos Personales",
				"Nombre(s)": data.name,
				"Apellido(s)": data.lastName,
				"Nacionalidad": "ARGENTINA",
				"Numero de Identidad": data.dni,
				"Correo": data.email,
				"Numero de Celular":data.phone
			}
			}
		}
		},
		"iss":  did.did()
	});
};