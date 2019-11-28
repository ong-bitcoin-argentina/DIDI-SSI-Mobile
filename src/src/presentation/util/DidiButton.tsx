import React, { Fragment } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

import DidiTheme from "../resources/DidiTheme";
import themes from "../resources/themes";

import { DidiText } from "./DidiText";

export interface DidiButtonProps extends TouchableOpacityProps {
	title: string;
	titleStyle?: StyleProp<TextStyle>;
	theme?: DidiTheme;
}

export default class DidiButton extends React.Component<DidiButtonProps> {
	public render() {
		const theme = this.props.theme ? this.props.theme : themes.primaryTheme;
		const currentButtonColor = {
			backgroundColor: this.props.disabled ? theme.buttonDisabled : theme.button
		};
		return (
			<TouchableOpacity
				accessibilityRole="button"
				{...this.props}
				style={[styles.button, currentButtonColor, this.props.style]}
			>
				<DidiText.Button disabled={this.props.disabled || false} style={this.props.titleStyle}>
					{this.props.title}
				</DidiText.Button>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5
	},
	text: {
		marginHorizontal: 10
	}
});
