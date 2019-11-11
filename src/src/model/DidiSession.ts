import { EthrDID } from "../uPort/types/EthrDID";

export interface DidiSession {
	isLoggedIn: boolean;
	did: EthrDID | null;
}
