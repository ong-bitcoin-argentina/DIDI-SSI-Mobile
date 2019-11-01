import React from "react";
import { ScrollView, Text, YellowBox } from "react-native";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppNavigator from "./presentation/AppNavigator";
import { SplashContent } from "./presentation/SplashContent";
import { persistor, store } from "./store/normalizedStore";
import { didiConnect, StoreContent } from "./store/store";

YellowBox.ignoreWarnings([
	"Warning: componentWillReceiveProps is deprecated and will be removed in the next major version.", // External error in SafeArea
	"Warning: ViewPagerAndroid has been extracted from react-native core and will be removed in a future release." // External error in MaterialTopTabNavigator (Android only)
]);

const AppContainer = createAppContainer(AppNavigator);

const StoreStatePanel = didiConnect(
	class extends React.Component<StoreContent> {
		render() {
			return (
				<ScrollView style={{ minHeight: 200, maxHeight: 200 }}>
					<Text>{JSON.stringify(this.props.serviceCalls, null, 4)}</Text>
				</ScrollView>
			);
		}
	},
	state => state
);

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
