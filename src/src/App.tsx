import 'text-encoding-polyfill';
import React from "react";
import { ScrollView, Text, YellowBox } from "react-native";
import { createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import TypedObject from "./util/TypedObject";

import AppNavigator from "./presentation/AppNavigator";
import { SplashContent } from "./presentation/SplashContent";
import { PushNotificationReceiver } from "./services/PushNotificationObserver";
import { persistor, store } from "./store/normalizedStore";
import { didiConnect, StoreContent } from "./store/store";
import { initializeDeepLinking, removeDeepLinkListener } from "./presentation/util/appRouter";

YellowBox.ignoreWarnings([
	"Warning: componentWillReceiveProps has been renamed, and is not recommended for use.", // External error in SafeArea
	"Warning: ViewPagerAndroid has been extracted from react-native core and will be removed in a future release." // External error in MaterialTopTabNavigator (Android only)
]);

const AppContainer = createAppContainer(AppNavigator);

const StoreStatePanel = didiConnect(
	class StoreStatePanel extends React.PureComponent<StoreContent> {
		render() {
			if (true) {
				return null;
			}

			const toShow = TypedObject.mapValues(this.props.serviceCalls, value => {
				if (value === undefined || value.state !== "IN_PROGRESS" || value.command.type !== "RUN") {
					return value;
				}
				return { type: "RUN", name: value.command.func.name, args: value.command.args };
			});
			return (
				<ScrollView style={{ minHeight: 200, maxHeight: 200 }}>
					<Text style={{ fontSize: 8 }}>{JSON.stringify(this.props, null, 4)}</Text>
				</ScrollView>
			);
		}
	},
	state => state
);

export default class App extends React.Component {
	componentDidMount() {
		initializeDeepLinking();
	}

	componentWillUnmount() {
		removeDeepLinkListener();
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={<SplashContent />}>
					<PushNotificationReceiver />
					<AppContainer />
					<StoreStatePanel />
				</PersistGate>
			</Provider>
		);
	}
}
