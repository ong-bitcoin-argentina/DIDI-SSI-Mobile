import { ServiceSettings } from "./model/ServiceSettings";

type AppConfig = { debug: boolean; defaultServiceSettings: ServiceSettings };

const debug: boolean = true;

const defaultDebugServiceSettings: ServiceSettings = {
	sharePrefix: "http://192.168.2.123:8080/api/credential_viewer",
	trustGraphUri: "http://192.168.2.123:3001/graphql",
	ethrDidUri: "https://mainnet.infura.io/v3/***REMOVED***",
	didiUserServer: "http://192.168.2.123:3000/api/1.0/didi"
};

const defaultStagingServiceSettings: ServiceSettings = {
	sharePrefix: "http://192.168.2.123:8080/api/credential_viewer",
	trustGraphUri: "http://mou.nec.com.ar/graphql",
	ethrDidUri: "https://mainnet.infura.io/v3/***REMOVED***",
	didiUserServer: "http://didi.nec.com.ar:8089/api/1.0/didi"
};

export const AppConfig: AppConfig = {
	debug,
	defaultServiceSettings: debug ? defaultDebugServiceSettings : defaultStagingServiceSettings
};

export const PRIVATE_KEY_SEED_PASSWORD = "***REMOVED***";
