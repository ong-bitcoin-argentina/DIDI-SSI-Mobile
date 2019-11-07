import React from "react";

import NavigationEnabledComponent from "./util/NavigationEnabledComponent";

import { didiConnect } from "../store/store";

import { StartAccessProps } from "./access/StartAccess";
import { DashboardScreenProps } from "./dashboard/home/Dashboard";
import NavigationHeaderStyle from "./resources/NavigationHeaderStyle";
import { SplashContent } from "./SplashContent";

export interface SplashScreenNavigation {
	Access: StartAccessProps;
	Dashboard: DashboardScreenProps;
}

interface SplashScreenStateProps {
	isLoggedIn: boolean;
}

class SplashScreen extends NavigationEnabledComponent<SplashScreenStateProps, {}, SplashScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	render() {
		return <SplashContent />;
	}

	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.navigate("Dashboard", {});
		} else {
			this.navigate("Access", {});
		}
	}
}

const connected = didiConnect(SplashScreen, state => ({
	isLoggedIn: state.sessionFlags.isLoggedIn
}));

export { connected as SplashScreen };
