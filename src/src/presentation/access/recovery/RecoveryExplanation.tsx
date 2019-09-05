import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import {
	StyleSheet,
	Text,
	View,
	Image,
	SafeAreaView,
	StatusBar
} from "react-native";
import React, { Fragment } from "react";

import DidiButton from "../../util/DidiButton";
import themes from "../../styles/themes";
import colors from "../../styles/colors";
import { RecoveryEnterEmailProps } from "./RecoveryEnterEmail";
import NavigationHeaderStyle from "../../styles/NavigationHeaderStyle";

export type RecoveryExplanationProps = {};

const strings = {
	recoveryExplanation: {
		barTitle: "Recuperar Cuenta",
		messageMotivesTitle: "Si quieres recuperar la cuenta es porque:",
		messageMotives: [
			"Te robaron el teléfono",
			"Cambiaste tu nro. de teléfono",
			"Perdiste tu teléfono"
		],
		rememberEmailMessage:
			"Debes recordar tu email y contraseña de resguardo para recuperar su cuenta",
		startButtonText: "Iniciar"
	}
};

export interface RecoveryExplanationNavigation {
	RecoveryEnterEmail: RecoveryEnterEmailProps;
}

export class RecoveryExplanationScreen extends NavigationEnabledComponent<
	RecoveryExplanationProps,
	{},
	RecoveryExplanationNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(
		strings.recoveryExplanation.barTitle
	);

	render() {
		return (
			<Fragment>
				<StatusBar
					backgroundColor={themes.darkNavigation}
					barStyle="light-content"
				/>

				<SafeAreaView style={styles.area}>
					<Text style={styles.head}>
						{strings.recoveryExplanation.messageMotivesTitle}
					</Text>

					<View style={styles.motives}>
						{strings.recoveryExplanation.messageMotives.map(motive => (
							<Text
								key={strings.recoveryExplanation.messageMotives.indexOf(motive)}
								style={styles.motive}
							>
								{"-" + motive}
							</Text>
						))}
					</View>

					<Image
						source={require("../resources/images/accountRecover.png")}
						style={styles.image}
					></Image>

					<Text style={styles.foot}>
						{strings.recoveryExplanation.rememberEmailMessage}
					</Text>

					<DidiButton
						style={styles.startButton}
						onPress={() => this.navigate("RecoveryEnterEmail", {})}
						title={strings.recoveryExplanation.startButtonText}
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
	},
	startButton: {
		backgroundColor: themes.primaryTheme.button,
		width: "90%"
	}
});
