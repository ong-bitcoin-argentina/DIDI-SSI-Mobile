import React from "react";
import { createAppContainer } from "react-navigation";

import AccessNavigator from "./presentation/access/AccessNavigator";
import { DashboardScreen } from "./presentation/dashboard/dashboard";

const AppContainer = createAppContainer(AccessNavigator.navigator());

export default class App extends React.Component {
	render() {
		return <DashboardScreen />;
	}
}
