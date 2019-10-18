import React from "react";
import { Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";

export type RoundsScreenProps = {};
export type RoundsScreenState = {};
export interface RoundsScreenNavigation {
	DashboardHome: DashboardScreenProps;
}

export class RoundsScreen extends NavigationEnabledComponent<
	RoundsScreenProps,
	RoundsScreenState,
	RoundsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<RoundsScreenNavigation, "DashboardHome">(
		strings.tabNames.rounds,
		"DashboardHome",
		{}
	);

	render() {
		return (
			<DidiScreen>
				<Text>Pantalla en construccion</Text>
			</DidiScreen>
		);
	}
}
