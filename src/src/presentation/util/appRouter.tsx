import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { getSignerForHDPath } from "react-native-uport-signer";
import { Credentials, SimpleSigner } from "uport-credentials";
import { DIDI_SERVER_DID, URL_DOMAIN, URL_SERVICE_LOGINSUCCESS, URL_SERVICE_LOGINDENIED, URL_APP } from "../../AppConfig";
import { CredentialDocument, EthrDID } from "@proyecto-didi/app-sdk";
import DeepLinking from "react-native-deep-linking";
import { NavigationActions } from "react-navigation";
import { ActiveDid } from "../../store/reducers/didReducer";
import { IShareRequestData } from '../../model/ShareRequest';
import JwtDecode from "jwt-decode";
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
function removeBlockchainFromDid(did: string): string {
    const didAsArray = did.split(":");
    if (didAsArray.length === 3) return did;
    didAsArray.splice(2, 1);
    return didAsArray.join(":");
  }


export const JwtDecodeDocuments = async (documents:CredentialDocument[])=>{
	const result = [];
	for (const doc of documents) {
		const docJWT:any =  await JwtDecode(doc.jwt)
		docJWT.iss = removeBlockchainFromDid(docJWT.iss);
		docJWT.sub= removeBlockchainFromDid(docJWT.sub);
		result.push(docJWT)
	}
	return result;
}



export const createSharedRequestToken = async (did: ActiveDid, shareRequests:IShareRequestData[],tokenREQ?: any ):Promise<any> => {
	if (!did || !did.did) {
		return 'null';
	}	
	const credentialsParams: Settings = {};
	credentialsParams.signer = await getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = removeBlockchainFromDid(shareRequests[0].iss);
	const cred = new Credentials(credentialsParams);

	return await cred.createDisclosureResponse({
		aud: shareRequests[0].aud,
		type: shareRequests[0].type,
		// req:,
		vc:shareRequests
	});
};

export const createSharedResponseToken = async (did: ActiveDid, shareRequests:IShareRequestData[],vcDocuments:any, token : any):Promise<any> => {
	try {
		if (!did || !did.did) {
			return 'null';
		}	
		const credentialsParams: Settings = {};
		credentialsParams.signer = await getSignerForHDPath(getDidAddress(did));
		credentialsParams.did = removeBlockchainFromDid(shareRequests[0].iss);
		const cred = new Credentials(credentialsParams);	  
		
		return await cred.createDisclosureResponse({
			aud: shareRequests[0].aud,
			type: shareRequests[0].type,
			// req: token,   Descomentar
			vc:vcDocuments
		});	
	} catch (error) {
		console.log('EL ERROROR ES ');
		console.log(error);		
	}
	
};
