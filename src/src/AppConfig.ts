import { ServiceSettings } from "./model/ServiceSettings";
import Config from "react-native-config";

type AppConfig = { debug: boolean; defaultServiceSettings: ServiceSettings };

const debug: boolean = false;

const defaultDebugServiceSettings: ServiceSettings = {
	sharePrefix: "https://viewer.staging.didi.atixlabs.com/api/credential_viewer",
	trustGraphUri: "https://mouro.staging.didi.atixlabs.com/graphql",
	ethrDidUri: "https://did.testnet.rsk.co:4444",
	ethrDelegateUri: "https://did.testnet.rsk.co:4444",
	didiUserServer: "https://server.staging.didi.atixlabs.com/api/1.0/didi",
	semillasServerUri: "https://api.staging.semillas.atixlabs.com",
	semillasLogin: {
		user: "didiUser@atixlabs.com",
		password: "admin"
	}
};

const defaultStagingServiceSettings: ServiceSettings = {
	sharePrefix: "http://alpha.didi.org.ar/api/credential_viewer",
	trustGraphUri: "http:/alpha.didi.org.ar/graphql",
	ethrDidUri: "https://did.testnet.rsk.co:4444",
	ethrDelegateUri: "https://did.testnet.rsk.co:4444",
	didiUserServer: "http://alpha.didi.org.ar/api/1.0/didi",
	semillasServerUri: "http://20.49.23.47",
	semillasLogin: {
		user: "didiUser@atixlabs.com",
		password: "admin"
	}
};

export const AppConfig: AppConfig = {
	debug,
	defaultServiceSettings: debug ? defaultDebugServiceSettings : defaultStagingServiceSettings
};

export const PRIVATE_KEY_SEED_PASSWORD = Config.PRIVATE_KEY_SEED_PASSWORD;
export const NOTIFICATION_SENDER_ID = Config.NOTIFICATION_SENDER_ID;
export const PRESTADORES_FEATURE = Config.PRESTADORES_FEATURE === "true";
