import StoreAction from "./StoreAction";
import StoreContent from "./StoreContent";

const defaultContent: StoreContent = {
	loggedIn: true,
	identity: {
		id: "<persona.id>",
		name: "<Nombre Persona>",
		image: require("../presentation/access/resources/images/arg.png")
	},
	documents: [],
	recentActivity: []
};

function dummyReducer(state: StoreContent | undefined, action: StoreAction): StoreContent {
	if (state) {
		return state;
	} else {
		return defaultContent;
	}
}

export default dummyReducer;
