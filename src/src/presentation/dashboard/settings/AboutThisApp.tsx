import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

import commonStyles from "../../access/resources/commonStyles";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type AboutThisAppScreenProps = {};
type AboutThisAppScreenState = {};
export type AboutThisAppScreenNavigation = {};

export class AboutThisAppScreen extends NavigationEnabledComponent<
	AboutThisAppScreenProps,
	AboutThisAppScreenState,
	AboutThisAppScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Didi");

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
