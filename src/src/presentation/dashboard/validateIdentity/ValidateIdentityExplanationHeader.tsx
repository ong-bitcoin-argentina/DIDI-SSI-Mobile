import React, { Fragment, ReactElement } from "react";
import { StyleSheet, Text } from "react-native";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import strings from "../../resources/strings";

export interface ValidateIdentityExplanationHeaderProps {
	title: string | number;
	header: string;
}

export class ValidateIdentityExplanationHeader extends React.Component<ValidateIdentityExplanationHeaderProps> {
	render() {
		return (
			<Fragment>
				{this.renderTitle()}
				<DidiText.ValidateIdentity.Subtitle style={styles.header}>
					{this.props.header}
				</DidiText.ValidateIdentity.Subtitle>
			</Fragment>
		);
	}

	private renderTitle() {
		if (typeof this.props.title === "string") {
			return <DidiText.ValidateIdentity.Title style={styles.title}>{this.props.title}</DidiText.ValidateIdentity.Title>;
		} else {
			return (
				<Text style={{ alignSelf: "center" }}>
					<DidiText.ValidateIdentity.Title style={styles.title}>
						{strings.validateIdentity.step + " "}
					</DidiText.ValidateIdentity.Title>
					<DidiText.ValidateIdentity.StepNumber>{this.props.title}</DidiText.ValidateIdentity.StepNumber>
					<DidiText.ValidateIdentity.TotalNumber>
						{strings.validateIdentity.stepTotal}
					</DidiText.ValidateIdentity.TotalNumber>
				</Text>
			);
		}
	}
}

const styles = StyleSheet.create({
	header: {
		paddingVertical: 5,
		backgroundColor: colors.backgroundSeparator
	},
	title: {
		fontSize: 20
	}
});
