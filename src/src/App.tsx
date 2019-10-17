import React from "react";
import { createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store/normalizedStore";
import AppNavigator from "./presentation/AppNavigator";
import { SplashContent } from "./presentation/SplashScreen";

YellowBox.ignoreWarnings([
	"Warning: componentWillReceiveProps is deprecated and will be removed in the next major version.", // External error in SafeArea
	"Warning: ViewPagerAndroid has been extracted from react-native core and will be removed in a future release." // External error in MaterialTopTabNavigator (Android only)
]);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={<SplashContent />}>
					<AppContainer />
				</PersistGate>
			</Provider>
		);
	}
}
