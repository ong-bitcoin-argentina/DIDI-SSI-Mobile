import { EthrDID } from "./EthrDID";

export interface DidiDocument {
	jwt: string;
	issuer: EthrDID;
	issuedAt?: number;
	expireAt?: number;
}
