export interface ServiceSettings {
	sharePrefix: string;
	trustGraphUri: string;
	ethrDidUri: string;
	ethrDelegateUri: string;
	didiUserServer: string;
	semillasServerUri: string;
	semillasLogin: {
		user: string;
		password: string;
	};
}
