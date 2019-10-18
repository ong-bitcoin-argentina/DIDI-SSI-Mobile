import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";

import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { RecoveryEnterEmailProps } from "./RecoveryEnterEmail";

export type RecoveryExplanationProps = {};

export interface RecoveryExplanationNavigation {
	RecoveryEnterEmail: RecoveryEnterEmailProps;
}

export class RecoveryExplanationScreen extends NavigationEnabledComponent<
	RecoveryExplanationProps,
	{},
	RecoveryExplanationNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.recovery.barTitle);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<Text style={commonStyles.text.normal}>{strings.recovery.explanation.messageMotivesTitle}</Text>

						<View>
							{strings.recovery.explanation.messageMotives.map((motive, index) => (
								<Text key={index} style={[commonStyles.text.emphasis, { textAlign: "left" }]}>
									{"- " + motive}
								</Text>
							))}
						</View>

						<Image source={require("../resources/images/accountRecover.png")} style={commonStyles.image.image} />

						<Text style={commonStyles.text.faded}>{strings.recovery.explanation.rememberEmailMessage}</Text>

						<DidiButton
							onPress={() => this.navigate("RecoveryEnterEmail", {})}
							title={strings.recovery.explanation.startButtonText}
						/>
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
