import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

export interface RoundsScreenNavigation {}
export type RoundsScreenProps = {};
type RoundsScreenState = {};

export class RoundsScreen extends NavigationEnabledComponent<
	RoundsScreenProps,
	RoundsScreenState,
	RoundsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.tabNames.rounds);

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
