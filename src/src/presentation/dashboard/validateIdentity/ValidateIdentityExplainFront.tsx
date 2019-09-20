import React from "react";
import { Text, StyleSheet } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ContentImage from "../resources/images/validateIdentityExplainFront.svg";
import { ValidateIdentityScanFrontProps } from "./ValidateIdentityScanFront";

export interface ValidateIdentityExplainFrontNavigation {
	ValidateIdentityScanFront: ValidateIdentityScanFrontProps;
}
export type ValidateIdentityExplainFrontProps = {};
type ValidateIdentityExplainFrontState = {};

export class ValidateIdentityExplainFrontScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainFrontProps,
	ValidateIdentityExplainFrontState,
	ValidateIdentityExplainFrontNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				title={strings.validateIdentity.explainFront.title}
				header={strings.validateIdentity.explainFront.header}
				description={<Text style={styles.description}>{strings.validateIdentity.explainFront.description}</Text>}
				image={ContentImage}
				buttonAction={() => this.navigate("ValidateIdentityScanFront", {})}
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
