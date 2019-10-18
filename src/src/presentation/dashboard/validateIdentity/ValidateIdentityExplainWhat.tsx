import React from "react";
import { StyleSheet, Text } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { ValidateIdentityExplainHowProps } from "./ValidateIdentityExplainHow";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

export interface ValidateIdentityExplainWhatNavigation {
	ValidateIdentityHow: ValidateIdentityExplainHowProps;
}
export type ValidateIdentityExplainWhatProps = {};
type ValidateIdentityExplainWhatState = {};

export class ValidateIdentityExplainWhatScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainWhatProps,
	ValidateIdentityExplainWhatState,
	ValidateIdentityExplainWhatNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				title={strings.validateIdentity.welcome}
				header={strings.validateIdentity.what.header}
				description={<Text style={styles.description}>{strings.validateIdentity.what.description}</Text>}
				image={require("../resources/images/validateIdentityWhat.png")}
				buttonText={strings.validateIdentity.what.buttonText}
				buttonAction={() => this.navigate("ValidateIdentityHow", {})}
			/>
		);
	}
}

const styles = StyleSheet.create({
	description: {
		fontSize: 16,
		textAlign: "center"
	},
	bold: {
		fontWeight: "bold"
	}
});
