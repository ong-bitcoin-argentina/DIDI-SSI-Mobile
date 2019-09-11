import React from "react";
import { createAppContainer } from "react-navigation";

import AppNavigator from "./presentation/AppNavigator";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
	"Warning: componentWillReceiveProps is deprecated and will be removed in the next major version." // External error in SafeArea
]);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return <AppContainer />;
	}
}
