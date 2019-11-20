import React from "react";
import { Text } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

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
				<Text>{strings.debug.screenInProgress}</Text>
			</DidiScreen>
		);
	}
}
