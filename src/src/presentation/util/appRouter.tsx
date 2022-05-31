import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { getSignerForHDPath } from "react-native-uport-signer";
import { Credentials } from "uport-credentials";
import { DIDI_SERVER_DID, URL_DOMAIN, URL_SERVICE_LOGINSUCCESS, URL_SERVICE_LOGINDENIED, URL_APP } from "../../AppConfig";
import { CredentialDocument, EthrDID } from "@proyecto-didi/app-sdk";
import DeepLinking from "react-native-deep-linking";
import { NavigationActions } from "react-navigation";
import { ActiveDid } from "../../store/reducers/didReducer";
import { IssuerDetilState } from '../dashboard/issuers/IssuerDetail';
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

export const createSharedResponseToken = async (did: ActiveDid, shareRequest:IssuerDetilState[] , documents:CredentialDocument[]):Promise<any> => {
	if (!did || !did.did) {
		return 'null';
	}
	const jwt = documents.map(doc => doc.jwt);
	const credentialsParams: Settings = {};
	credentialsParams.signer = await getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = shareRequest[0].data.iss;
	const cred = new Credentials(credentialsParams);


	const shareReq = await cred.createVerification({
		"iat": shareRequest[0].data.iat,
		"type": shareRequest[0].data.type,
		"aud": shareRequest[0].data.aud,
		"iss": shareRequest[0].data.iss,
		"exp": 9,
		"req": "req",
		"vc": [shareRequest[0].data]		
	});
	const credResp = new Credentials(credentialsParams);
	const shareResponse =  await credResp.createVerification({
		"iat": shareRequest[0].data.iat,
		"type": shareRequest[0].data.type,
		"aud": shareRequest[0].data.aud,
		"iss": shareRequest[0].data.iss,
		"exp": 9,
		"req": shareReq,
		"vc": jwt,
	});

	return shareResponse;
};
