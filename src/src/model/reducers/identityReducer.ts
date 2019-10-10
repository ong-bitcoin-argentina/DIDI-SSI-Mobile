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
		street: "33",
		number: "23",
		neighborhood: "San Martin",
		postCode: "1234",
		liveHere: false
	}
};

export function identityReducer(state: Identity | undefined, action: IdentityAction): Identity {
	return state || defaultContent;
}
