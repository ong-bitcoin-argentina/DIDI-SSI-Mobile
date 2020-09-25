import { ServiceSettings } from "./model/ServiceSettings";
import Config from "react-native-config";

type AppConfig = {
	debug: boolean;
	defaultServiceSettings: ServiceSettings;
};

const debug: boolean = Config.APP_DEBUG === "true";

const defaultServiceSettings: ServiceSettings = {
	sharePrefix: Config.URL_VIEWER,
	trustGraphUri: Config.URL_MOURO,
	ethrDidUri: Config.URL_ETHR_DID,
	ethrDelegateUri: Config.URL_ETHR_DELEGATOR,
	didiUserServer: Config.URL_DIDI_SERVER
};

export const AppConfig: AppConfig = {
	debug,
	defaultServiceSettings
};

export const VERSION = Config.VERSION;
export const PRIVATE_KEY_SEED_PASSWORD = Config.PRIVATE_KEY_SEED_PASSWORD;
export const NOTIFICATION_SENDER_ID = Config.NOTIFICATION_SENDER_ID;
export const ENV_CODE = Config.ENV_CODE;
export const DIDI_SERVER_DID = Config.DIDI_SERVER_DID;
export const LATEST_FEATURE = Config.LATEST_FEATURE === "true";
export const QA = Config.QA === "true";
