import { ProviderConfig } from "didi-sdk";

export interface ServiceSettings {
	sharePrefix: string;
	viewerApiUrl: string;
	trustGraphUri: string;
	ethrDidUri: string;
	ethrDelegateUri: string;
	didiUserServer: string;
	providerConfig: ProviderConfig;
}
