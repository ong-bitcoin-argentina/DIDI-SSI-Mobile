import { ProviderConfig } from "didi-sdk";

export interface ServiceSettings {
	sharePrefix: string;
	trustGraphUri: string;
	ethrDidUri: string;
	ethrDelegateUri: string;
	didiUserServer: string;
	providerConfig: ProviderConfig;
}
