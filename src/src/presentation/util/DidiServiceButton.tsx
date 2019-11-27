import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

import colors from "../resources/colors";
import themes from "../resources/themes";

import { DidiText } from "./DidiText";

export interface DidiServiceButtonProps extends TouchableOpacityProps {
	title: string;
	isPending: boolean;
}

export class DidiServiceButton extends React.Component<DidiServiceButtonProps> {
	public render() {
		const currentButtonColor = {
			backgroundColor: this.props.disabled ? themes.primaryTheme.buttonDisabled : themes.primaryTheme.button
		};
		return (
			<TouchableOpacity
				accessibilityRole="button"
				disabled={this.props.isPending}
				{...this.props}
				style={[styles.button, currentButtonColor, this.props.style]}
			>
				{this.props.isPending ? (
					<ActivityIndicator size="large" color={colors.secondary} />
				) : (
					<DidiText.Button disabled={this.props.disabled || false}>{this.props.title}</DidiText.Button>
				)}
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
	}
});
