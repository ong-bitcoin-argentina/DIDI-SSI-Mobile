import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { getSignerForHDPath } from "react-native-uport-signer";
import { Credentials } from "uport-credentials";
import { DIDI_SERVER_DID } from "../../AppConfig";
import { EthrDID } from "didi-sdk";
import DeepLinking from "react-native-deep-linking";
import { NavigationActions } from "react-navigation";

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
		dynamicLink: `https://nextdidi.page.link/?link=https://aidironda.com/loginSuccess?token=${token}&apn=com.aidironda2`,
		deppLink: `ronda://loginSuccess?token=${token}`
	};
	await openApp(params);
};

export const loginDenied = async () => {
	const params = {
		dynamicLink: `https://nextdidi.page.link/?link=https://aidironda.com/loginDenied&apn=com.aidironda2`,
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

export const createToken = (did: EthrDID) => {
	const credentialsParams: Settings = {};
	credentialsParams.signer = getSignerForHDPath(getDidAddress(did));
	credentialsParams.did = did.did();

	const cred = new Credentials(credentialsParams);

	return cred.createVerification({
		sub: DIDI_SERVER_DID, //Address of receiver of the verification
		claim: { name: "Ronda" }
	});
};
