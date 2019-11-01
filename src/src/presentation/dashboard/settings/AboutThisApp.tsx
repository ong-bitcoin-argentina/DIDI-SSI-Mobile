import React from "react";
import { Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

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
			<DidiScreen>
				<Text>Pantalla en construccion</Text>
			</DidiScreen>
		);
	}
}
