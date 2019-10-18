import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

import commonStyles from "../../access/resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text>Pantalla en construccion</Text>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
