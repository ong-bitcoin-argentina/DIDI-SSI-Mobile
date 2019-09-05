import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar } from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import strings from "../resources/strings";
import themes from "../../styles/themes";
import colors from "../../styles/colors";
import { RecoveryEnterEmailProps } from "./RecoveryEnterEmail";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

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

				<SafeAreaView style={styles.area}>
					<Text style={styles.head}>{strings.recovery.explanation.messageMotivesTitle}</Text>

					<View style={styles.motives}>
						{strings.recovery.explanation.messageMotives.map(motive => (
							<Text key={strings.recovery.explanation.messageMotives.indexOf(motive)} style={styles.motive}>
								{"-" + motive}
							</Text>
						))}
					</View>

					<Image source={require("../resources/images/accountRecover.png")} style={styles.image} />

					<Text style={styles.foot}>{strings.recovery.explanation.rememberEmailMessage}</Text>

					<DidiButton
						onPress={() => this.navigate("RecoveryEnterEmail", {})}
						title={strings.recovery.explanation.startButtonText}
					/>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	area: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: "center",
		justifyContent: "space-evenly"
	},
	head: {
		textAlign: "center",
		paddingTop: 30,
		width: "80%",
		fontSize: 19,
		color: colors.text
	},
	motives: {
		width: "70%"
	},
	motive: {
		fontSize: 19,
		fontWeight: "bold",
		color: colors.text
	},
	image: {
		width: "50%"
	},
	foot: {
		textAlign: "center",
		width: "70%",
		fontSize: 19,
		color: colors.textFaded
	}
});
