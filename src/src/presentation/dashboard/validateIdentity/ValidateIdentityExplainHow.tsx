import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import ValidateIdentityExplanation from "./ValidateIdentityExplanation";
import { ValidateIdentityFrontProps } from "./ValidateIdentityFront";

export interface ValidateIdentityExplainHowNavigation {
	ValidateIdentityFront: ValidateIdentityFrontProps;
}
export type ValidateIdentityExplainHowProps = {};

export class ValidateIdentityExplainHowScreen extends NavigationEnabledComponent<
	ValidateIdentityExplainHowProps,
	{},
	ValidateIdentityExplainHowNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.validateIdentity.header);

	render() {
		return (
			<ValidateIdentityExplanation
				header={{
					title: strings.validateIdentity.welcome,
					header: strings.validateIdentity.howTo.header
				}}
				description={
					<View>
						<DidiText.ValidateIdentity.Normal style={styles.descriptionHeader}>
							{strings.validateIdentity.howTo.intro}
						</DidiText.ValidateIdentity.Normal>
						{strings.validateIdentity.howTo.steps.map((step, index) => {
							return (
								<View style={styles.listItemContainer} key={index}>
									<DidiText.ValidateIdentity.Enumerate style={[styles.listNumber, styles.listItem]}>
										{index + 1}.
									</DidiText.ValidateIdentity.Enumerate>
									<DidiText.ValidateIdentity.EnumerationItem style={styles.listItem}>
										{step}
									</DidiText.ValidateIdentity.EnumerationItem>
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
		marginBottom: 6
	},
	listItemContainer: {
		flexDirection: "row",
		marginHorizontal: 10,
		marginVertical: 5
	},
	listNumber: {
		width: 20,
		marginRight: 10
	},
	listItem: {
		fontSize: 16
	}
});
