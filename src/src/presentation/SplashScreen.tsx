import React from "react";

import { ServiceWrapper } from "../services/common/ServiceWrapper";
import NavigationEnabledComponent from "./util/NavigationEnabledComponent";

import { CheckDIDState } from "../services/internal/checkDid";
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
	checkDidState: CheckDIDState;
	isLoggedIn: boolean;
}
interface SplashScreenDispatchProps {
	checkDid(): void;
}

class SplashScreen extends NavigationEnabledComponent<
	SplashScreenStateProps & SplashScreenDispatchProps,
	{},
	SplashScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		this.props.checkDid();
	}

	render() {
		return (
			<ServiceWrapper serviceState={this.props.checkDidState} onServiceSuccess={() => this.onServiceSuccess()}>
				<SplashContent />
			</ServiceWrapper>
		);
	}

	private onServiceSuccess() {
		if (this.props.isLoggedIn) {
			this.navigate("Dashboard", {});
		} else {
			this.navigate("Access", {});
		}
	}
}

const connected = didiConnect(
	SplashScreen,
	state => ({
		checkDidState: state.serviceCalls.checkDid,
		isLoggedIn: state.sessionFlags.isLoggedIn
	}),
	dispatch => ({
		checkDid: () => dispatch({ type: "CHECK_DID", serviceAction: { type: "START", args: {} } })
	})
);

export { connected as SplashScreen };
