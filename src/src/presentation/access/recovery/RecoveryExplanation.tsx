import React from "react";
import { Image, Text, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import commonStyles from "../resources/commonStyles";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

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
			<DidiScreen>
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
			</DidiScreen>
		);
	}
}
