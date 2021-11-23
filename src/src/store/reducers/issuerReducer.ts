import { IssuerDescriptor } from "@proyecto-didi/app-sdk";

import { StoreAction } from "../StoreAction";

interface IssuerActionRegister {
	type: "ISSUER_REGISTER";
	content: IssuerDescriptor[];
}
export type IssuerAction = IssuerActionRegister;

export type IssuerRegistry = Partial<{ [did: string]: IssuerDescriptor }>;

export function issuerReducer(state: IssuerRegistry | undefined, action: StoreAction): IssuerRegistry {
	if (state === undefined) {
		return {};
	}

	switch (action.type) {
		case "ISSUER_REGISTER": {
			let register = state;
			action.content.forEach(descriptor => {
				register = {
					...register,
					[descriptor.did.did()]: descriptor
				};
			});
			return register;
		}
		default:
			return state;
	}
}
