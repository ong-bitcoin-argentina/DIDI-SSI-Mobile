import React from "react";
import { RNUportHDSigner } from "react-native-uport-signer";

import NavigationEnabledComponent from "./util/NavigationEnabledComponent";

import { StartAccessProps } from "./access/StartAccess";
import { DashboardScreenProps } from "./dashboard/home/Dashboard";
import NavigationHeaderStyle from "./resources/NavigationHeaderStyle";
import { SplashContent } from "./SplashContent";

export interface SplashScreenNavigation {
	Access: StartAccessProps;
	Dashboard: DashboardScreenProps;
}

export class SplashScreen extends NavigationEnabledComponent<{}, {}, SplashScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		RNUportHDSigner.hasSeed().then(hasSeed => {
			if (hasSeed) {
				this.navigate("Dashboard", {});
			} else {
				this.navigate("Access", {});
			}
		});
	}

	render() {
		return <SplashContent />;
	}
}
