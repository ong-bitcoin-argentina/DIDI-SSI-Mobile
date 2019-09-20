import React, { Fragment } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import DidiCamera from "../common/DidiCamera";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import strings from "../../resources/strings";

export interface ValidateIdentityScanBackNavigation {}
export type ValidateIdentityScanBackProps = {};
type ValidateIdentityScanBackState = {};

export class ValidateIdentityScanBackScreen extends NavigationEnabledComponent<
	ValidateIdentityScanBackProps,
	ValidateIdentityScanBackState,
	ValidateIdentityScanBackNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<DidiCamera onPictureTaken={data => {}} />
				</SafeAreaView>
			</Fragment>
		);
	}
}
