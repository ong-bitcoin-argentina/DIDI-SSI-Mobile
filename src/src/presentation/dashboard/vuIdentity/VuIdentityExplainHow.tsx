import React from "react";
import { StyleSheet, View } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

import VuIdentityExplanation from './VuIdentityExplanation';

export interface VuIdentityExplainHowNavigation {
	VuIdentityFront: {};
}
export type VuIdentityExplainHowProps = {};

export class VuIdentityExplainHowScreen extends NavigationEnabledComponent<
VuIdentityExplainHowProps,
	{},
	VuIdentityExplainHowNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.vuIdentity.header);

	render() {
		return (
			<VuIdentityExplanation
				header={{
					title: strings.vuIdentity.welcome,
					header: strings.vuIdentity.howTo.header
				}}
				description={
					<View>
						<DidiText.ValidateIdentity.Normal style={styles.descriptionHeader}>
							{strings.vuIdentity.howTo.intro}
						</DidiText.ValidateIdentity.Normal>
						{strings.vuIdentity.howTo.steps.map((step, index) => {
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
				buttonText={strings.vuIdentity.howTo.buttonText}
				buttonAction={() => this.navigate("VuIdentityFront", {})}
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