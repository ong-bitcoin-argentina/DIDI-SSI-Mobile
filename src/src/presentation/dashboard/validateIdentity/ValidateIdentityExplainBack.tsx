import React from "react";
import { Text, StyleSheet } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import { ValidateIdentityScanBackProps } from "./ValidateIdentityScanBack";

export interface ValidateIdentityExplainBackNavigation {
	ValidateIdentityScanBack: ValidateIdentityScanBackProps;
}
export type ValidateIdentityExplainBackProps = {};
type ValidateIdentityExplainBackState = {};

export class ValidateIdentityExplainBackScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainBackProps,
	ValidateIdentityExplainBackState,
	ValidateIdentityExplainBackNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				title={strings.validateIdentity.explainBack.title}
				header={strings.validateIdentity.explainBack.header}
				description={<Text style={styles.description}>{strings.validateIdentity.explainBack.description}</Text>}
				image={require("../resources/images/validateIdentityExplainBack.png")}
				buttonAction={() => this.navigate("ValidateIdentityScanBack", {})}
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
