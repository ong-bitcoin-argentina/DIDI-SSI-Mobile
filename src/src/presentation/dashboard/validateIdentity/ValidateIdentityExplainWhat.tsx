import React from "react";
import { Text, StyleSheet } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ContentImage from "../resources/images/validateIdentityWhat.svg";
import { ValidateIdentityExplainHowNavigation } from "./ValidateIdentityExplainHow";

export interface ValidateIdentityExplainWhatNavigation {
	ValidateIdentityHow: ValidateIdentityExplainHowNavigation;
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
				image={ContentImage}
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
