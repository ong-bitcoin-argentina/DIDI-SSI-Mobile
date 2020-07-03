import { ServiceSettings } from "./model/ServiceSettings";
import Config from "react-native-config";

type AppConfig = { debug: boolean; defaultServiceSettings: ServiceSettings };

const debug: boolean = true;

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

export const AppConfig: AppConfig = {
	debug,
	defaultServiceSettings: debug ? defaultDebugServiceSettings : defaultStagingServiceSettings
};

export const PRIVATE_KEY_SEED_PASSWORD = Config.PRIVATE_KEY_SEED_PASSWORD;
export const NOTIFICATION_SENDER_ID = Config.NOTIFICATION_SENDER_ID;
