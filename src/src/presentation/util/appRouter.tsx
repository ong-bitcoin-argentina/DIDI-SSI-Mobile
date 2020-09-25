import { Linking } from "react-native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { getSignerForHDPath } from 'react-native-uport-signer'
import { Credentials } from 'uport-credentials'
import { DIDI_SERVER_DID } from "../../AppConfig";

interface Settings {
    did?: string;
    signer?: any;
}

interface Link {
    url: string
}

export const successfullyLogged = async ( token: string ) => {
    const params = {
        dynamicLink : `https://aidi.page.link/?link=https://aidironda.com/loginSuccess?token=${token}&apn=com.aidironda`,
        deppLink : `ronda://loginSuccess?token=${token}`
    }
    await openApp(params);
}

export const loginDenied = async () => {
    const params = {
        dynamicLink : `https://aidi.page.link/?link=https://aidironda.com/loginDenied&apn=com.aidironda`,
        deppLink : `ronda://loginDenied`
    }
    await openApp(params);
}

export const openApp = async (args : { dynamicLink: string, deppLink: string }) => {
    const { deppLink, dynamicLink } = args;
    const canOpenURL = await Linking.canOpenURL(deppLink);
    if (canOpenURL) Linking.openURL(deppLink);
    else Linking.openURL(dynamicLink);
}

export const deepLinkHandler = (myHandler: ( link: Link ) => void) => {
    console.log("deepLinkHandler");
    Linking.getInitialURL().then(myHandler);
    Linking.addEventListener("url",myHandler);
    return () => { Linking.removeEventListener("url", e => console.log("url",e)); }
}

export const dynamicLinkHandler = (myHandler : ( link: Link ) => void) => {
    console.log("dynamicLinkHandler");
    dynamicLinks().getInitialLink().then(myHandler);
    const unsubscribe = dynamicLinks().onLink(myHandler);
    return () => unsubscribe();
}

export const askedForLogin = (link: Link) => link.url.match(/login/);
export const navigateToCredentials = (link: Link) => link.url.match(/credentials/);

export const createToken = (address: string) => {
    const credentialsParams :Settings = {};
    credentialsParams.signer = getSignerForHDPath(address)
    credentialsParams.did = `did:ethr:${address}`
    
    const cred = new Credentials(credentialsParams)

    return cred.createVerification({
        sub: DIDI_SERVER_DID, //Address of receiver of the verification
        claim: { name: 'Ronda'}
    });
}