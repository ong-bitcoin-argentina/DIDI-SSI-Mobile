import { SelectiveDisclosureRequest } from "../../uPort/types/SelectiveDisclosureRequest";

export interface RequestDocument {
	jwt: string;
	content: SelectiveDisclosureRequest;
}
