import React, { Fragment } from "react";
import { Text, StyleSheet, View } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import ValidateIdentityExplanation from "./ValidateIdentityExplanation";

import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ContentImage from "../resources/images/validateIdentityHow.svg";
import colors from "../../resources/colors";

export interface ValidateIdentityExplainHowNavigation {
	// ValidateIdentityHow: ValidateIdentityExplainHowNavigation;
}
export type ValidateIdentityExplainHowProps = {};
type ValidateIdentityExplainHowState = {};

export class ValidateIdentityExplainHowScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainHowProps,
	ValidateIdentityExplainHowState,
	ValidateIdentityExplainHowNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				title={strings.validateIdentity.welcome}
				header={strings.validateIdentity.howTo.header}
				description={
					<View>
						<Text style={styles.descriptionHeader}>{strings.validateIdentity.howTo.intro}</Text>
						{strings.validateIdentity.howTo.steps.map((step, index) => {
							return (
								<View style={styles.listItemContainer} key={index}>
									<Text style={styles.listNumber}>{index + 1}.</Text>
									<Text style={styles.description}>{step}</Text>
								</View>
							);
						})}
					</View>
				}
				image={ContentImage}
				buttonText={strings.validateIdentity.howTo.buttonText}
				buttonAction={() => {}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	descriptionHeader: {
		fontSize: 16,
		marginBottom: 6
	},
	listItemContainer: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5
	},
	listNumber: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.primary,
		width: 20
	},
	description: {
		fontSize: 16
	}
});
