import React from "react";
import { createAppContainer } from "react-navigation";

import AccessNavigator from "./presentation/access/AccessNavigator";

const AppContainer = createAppContainer(AccessNavigator.navigator());

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
