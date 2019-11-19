import { Identity, ValidationState } from "../../model/Identity";

export const sampleIdentity: Identity = {
	id: "@lili.martinez",
	name: "Liliana Martinez",
	image: require("../images/avatar.png"),
	backgroundImage: require("../images/bg.jpg"),

	fullName: {
		value: "Liliana Beatriz Martinez"
	},
	cellPhone: {
		value: "01133446677",
		state: ValidationState.Approved
	},
	email: {
		value: "lilita87@hotmail.com",
		state: ValidationState.Approved
	},
	document: {
		value: "30000111",
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
