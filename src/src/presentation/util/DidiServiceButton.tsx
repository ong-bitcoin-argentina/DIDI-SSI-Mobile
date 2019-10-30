import React from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

import colors from "../resources/colors";
import themes from "../resources/themes";

export interface DidiServiceButtonProps extends TouchableOpacityProps {
	title: string;
	isPending: boolean;
}

export class DidiServiceButton extends React.Component<DidiServiceButtonProps> {
	public render() {
		const currentButtonColor = {
			backgroundColor: this.props.disabled ? themes.primaryTheme.buttonDisabled : themes.primaryTheme.button
		};
		const currentTitleStyle: TextStyle = {
			fontStyle: this.props.disabled ? "italic" : "normal"
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
					<Text style={[styles.text, currentTitleStyle]}>{this.props.title}</Text>
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
	},
	text: {
		fontWeight: "500",
		fontSize: 16,
		textAlign: "center",
		color: "#FFF",
		marginHorizontal: 10
	}
});
