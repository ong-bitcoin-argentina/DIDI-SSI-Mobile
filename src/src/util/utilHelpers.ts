import { EthrDID } from "didi-sdk";

enum blockchains {
	LACCHAIN = "LACCHAIN",
	RSK = "RSK",
	BFA = "BFA"
}

const customIncludes = (str1: string = "", str2: string = ""): boolean => {
	return str1.toLowerCase().includes(str2.toLowerCase());
};

export const getBlockchain = (did: EthrDID): blockchains => {
	const plainDid = did.did();
	switch (true) {
		case customIncludes(plainDid, blockchains.BFA):
			return blockchains.BFA;
		case customIncludes(plainDid, blockchains.LACCHAIN):
			return blockchains.LACCHAIN;
		case customIncludes(plainDid, blockchains.RSK):
			return blockchains.RSK;
		default:
			return blockchains.RSK;
	}
};
