import { EthrDID } from "didi-sdk";

enum blockchains {
	LACCHAIN = "LACCHAIN",
	RSK = "RSK",
	BFA = "BFA"
}

const insensitiveIncludes = (str1 = "", str2 = ""): boolean => {
	return str1.toLowerCase().includes(str2.toLowerCase());
};

const wrap = (str: string) => `did:ethr:${str}:`;

export const getBlockchain = (did: EthrDID): blockchains => {
	const plainDid = did.did();
	switch (true) {
		case insensitiveIncludes(plainDid, wrap(blockchains.BFA)):
			return blockchains.BFA;
		case insensitiveIncludes(plainDid, wrap(blockchains.LACCHAIN)):
			return blockchains.LACCHAIN;
		case insensitiveIncludes(plainDid, wrap(blockchains.RSK)):
			return blockchains.RSK;
		default:
			return blockchains.RSK;
	}
};
