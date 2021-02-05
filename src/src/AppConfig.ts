import { ServiceSettings } from "./model/ServiceSettings";
import Config from "react-native-config";

type AppConfig = {
	debug: boolean;
	defaultServiceSettings: ServiceSettings;
};

const debug: boolean = Config.APP_DEBUG === "true";

const defaultServiceSettings: ServiceSettings = {
	sharePrefix: Config.URL_VIEWER,
	viewerApiUrl: Config.URL_VIEWER_API,
	trustGraphUri: Config.URL_MOURO,
	ethrDidUri: Config.BLOCKCHAIN_URL_MAIN,
	ethrDelegateUri: Config.BLOCKCHAIN_URL_MAIN,
	providerConfig: {
		networks: [
			{
				name: "mainnet",
				rpcUrl: Config.BLOCKCHAIN_URL_MAIN,
				registry: Config.BLOCKCHAIN_CONTRACT_MAIN
			},
			{
				name: "lacchain",
				rpcUrl: Config.BLOCKCHAIN_URL_LAC,
				registry: Config.BLOCKCHAIN_CONTRACT_LAC
			},
			{
				name: "bfa",
				rpcUrl: Config.BLOCKCHAIN_URL_BFA,
				registry: Config.BLOCKCHAIN_CONTRACT_BFA
			},
			{
				name: "rsk",
				rpcUrl: Config.BLOCKCHAIN_URL_RSK,
				registry: Config.BLOCKCHAIN_CONTRACT_RSK
			}
		]
	},
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
