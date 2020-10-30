import React, { Fragment } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";

import DidiTheme from "../resources/DidiTheme";
import themes from "../resources/themes";

import { DidiText } from "./DidiText";

export interface DidiButtonProps extends TouchableOpacityProps {
	title: string;
	titleStyle?: StyleProp<TextStyle>;
	theme?: DidiTheme;
	small?: boolean;
}

export default class DidiButton extends React.Component<DidiButtonProps> {
	public render() {
		const { small } = this.props;
		const theme = this.props.theme ?? themes.primaryTheme;
		const currentButtonColor = {
			backgroundColor: this.props.disabled ? theme.buttonDisabled : theme.button
		};
		const buttonStyles = [styles.button, currentButtonColor, small ? styles.small : {}, this.props.style];
		return (
			<TouchableOpacity accessibilityRole="button" {...this.props} style={buttonStyles}>
				<DidiText.Button disabled={this.props.disabled || false} style={this.props.titleStyle}>
					{this.props.title}
				</DidiText.Button>
			</TouchableOpacity>
		);
	}
}

export const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: 56,
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5,
		paddingHorizontal: 16
	},
	small: {
		height: 40,
		paddingHorizontal: 16
	},
	text: {
		marginHorizontal: 10
	}
});
