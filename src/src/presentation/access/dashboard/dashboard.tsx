import { Text, View, SafeAreaView, StatusBar } from "react-native";
import React, { Fragment } from "react";

import commonStyles from "../resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type DashboardScreenNavigation = {};
export type DashboardScreenProps = {};
interface DashboardScreenState {}

export class DashboardScreen extends NavigationEnabledComponent<
	DashboardScreenProps,
	DashboardScreenState,
	DashboardScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("dashboard");
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={commonStyles.text.emphasis}>Hola, soy un dashboard.</Text>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
