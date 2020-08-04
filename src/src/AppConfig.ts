import { ServiceSettings } from "./model/ServiceSettings";
import Config from "react-native-config";

type AppConfig = {
	debug: boolean;
	defaultServiceSettings: ServiceSettings;
};

const debug: boolean = Boolean(Config.APP_DEBUG);

const defaultServiceSettings: ServiceSettings = {
	sharePrefix: Config.URL_VIEWER,
	trustGraphUri: Config.URL_MOURO,
	ethrDidUri: Config.URL_ETHR_DID,
	ethrDelegateUri: Config.URL_ETHR_DELEGATOR,
	didiUserServer: Config.URL_DIDI_SERVER,
	semillasServerUri: Config.URL_SEMILLAS,
	semillasLogin: {
		user: Config.SEMILLAS_USERNAME,
		password: Config.SEMILLAS_PASSWORD
	}
};

// const defaultStagingServiceSettings: ServiceSettings = {
// 	sharePrefix: "https://viewer.alpha.didi.org.ar/api/credential_viewer",
// 	trustGraphUri: "https://mouro.alpha.didi.org.ar/graphql",
// 	ethrDidUri: "https://did.testnet.rsk.co:4444",
// 	ethrDelegateUri: "https://did.testnet.rsk.co:4444",
// 	didiUserServer: "https://server.alpha.didi.org.ar/api/1.0/didi",
// 	semillasServerUri: "https://api.semillas.didi.org.ar",
// 	semillasLogin: {
// 		user: SEMILLAS_USERNAME,
// 		password: SEMILLAS_PASSWORD
// 	}
// };

export const AppConfig: AppConfig = {
	debug,
	defaultServiceSettings
};

export const VERSION = Config.VERSION;
export const PRIVATE_KEY_SEED_PASSWORD = Config.PRIVATE_KEY_SEED_PASSWORD;
export const NOTIFICATION_SENDER_ID = Config.NOTIFICATION_SENDER_ID;
export const PRESTADORES_FEATURE = Boolean(Config.PRESTADORES_FEATURE);
