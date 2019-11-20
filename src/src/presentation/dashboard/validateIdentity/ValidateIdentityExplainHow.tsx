import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import colors from "../../resources/colors";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentityFrontProps } from "./ValidateIdentityFront";

export interface ValidateIdentityExplainHowNavigation {
	ValidateIdentityFront: ValidateIdentityFrontProps;
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
				image={require("../../resources/images/validateIdentityHow.png")}
				buttonText={strings.validateIdentity.howTo.buttonText}
				buttonAction={() => this.navigate("ValidateIdentityFront", {})}
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
