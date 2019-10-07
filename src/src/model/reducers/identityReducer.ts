import { Identity, ValidationState } from "../data/Identity";

export interface IdentityAction {
	type: never;
}

const defaultContent: Identity = {
	id: "@lili.martinez",
	name: "Liliana Martinez",
	image: require("../images/avatar.png"),
	backgroundImage: require("../images/bg.jpg"),

	fullName: {
		value: "Liliana Beatriz Martinez"
	},
	cellPhone: {
		value: "15 3344 6677",
		state: ValidationState.Approved
	},
	email: {
		value: "lilita87@hotmail.com",
		state: ValidationState.Approved
	},
	document: {
		value: "30.000.111",
		state: ValidationState.Pending
	},
	nationality: {
		value: "Argentina",
		state: ValidationState.Pending
	},
	address: {
		value: "Manzana 24, Seccion 3, Edificio 1",
		state: ValidationState.Rejected
	}
};

export function identityReducer(state: Identity | undefined, action: IdentityAction): Identity {
	return state || defaultContent;
}
