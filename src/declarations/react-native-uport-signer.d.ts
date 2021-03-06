declare module "react-native-uport-signer" {
	type KeyAddress = string;
	type SeedPhrase = string;
	type DerivationPath = string;
	type ProtectionLevel = "simple" | "prompt" | "singleprompt";
	type Base64EncodedJWT = string;

	interface AddressObject {
		address: KeyAddress;
		pubKey: string;
	}
	interface ExpandedJWT {
		v: number;
		r: string;
		s: string;
	}

	interface RNUportHDSignerType {
		hasSeed(): Promise<boolean>;
		listSeedAddresses(): Promise<Array<KeyAddress>>;

		createSeed(protection: ProtectionLevel): Promise<AddressObject>;
		importSeed(phrase: SeedPhrase, protection: ProtectionLevel): Promise<AddressObject>;
		deleteSeed(address: KeyAddress): void;
		showSeed(address: KeyAddress, explanation: string): Promise<SeedPhrase>;

		validateMnemonic(phrase: SeedPhrase): Promise<boolean>;

		signJwt(
			address: KeyAddress,
			path: DerivationPath,
			jwt: Base64EncodedJWT,
			explanation: string
		): Promise<ExpandedJWT>;
		signEthereumTransaction(
			address: KeyAddress,
			path: DerivationPath,
			jwt: Base64EncodedJWT,
			explanation: string
		): Promise<ExpandedJWT>;

		UPORT_ROOT_DERIVATION_PATH: DerivationPath;
	}
	export const RNUportHDSigner: RNUportHDSignerType;
}
