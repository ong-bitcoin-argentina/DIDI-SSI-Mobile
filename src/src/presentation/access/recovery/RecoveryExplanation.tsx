import React from "react";
import { Image, View } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import commonStyles from "../../resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

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
				<DidiText.Explanation.Normal>{strings.recovery.explanation.messageMotivesTitle}</DidiText.Explanation.Normal>

				<View>
					{strings.recovery.explanation.messageMotives.map((motive, index) => (
						<DidiText.Explanation.Emphasis key={index} style={{ textAlign: "left" }}>
							{"- " + motive}
						</DidiText.Explanation.Emphasis>
					))}
				</View>

				<Image source={require("../../resources/images/accountRecover.png")} style={commonStyles.image.image} />

				<DidiText.Explanation.Faded>{strings.recovery.explanation.rememberEmailMessage}</DidiText.Explanation.Faded>

				<DidiButton
					onPress={() => this.navigate("RecoveryEnterEmail", {})}
					title={strings.recovery.explanation.startButtonText}
				/>
			</DidiScreen>
		);
	}
}
