import React, { Fragment } from "react";
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	StyleProp,
	TextStyle
} from "react-native";
import themes from "../styles/themes";
import DidiTheme from "../styles/DidiTheme";

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
		const currentTitleStyle: TextStyle = {
			fontStyle: this.props.disabled ? "italic" : "normal"
		};
		return (
			<TouchableOpacity
				accessibilityRole="button"
				{...this.props}
				style={[styles.button, currentButtonColor, this.props.style]}
			>
				<Text style={[styles.text, currentTitleStyle, this.props.titleStyle]}>
					{this.props.title}
				</Text>
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
		width: "80%",
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 5
	},
	text: {
		fontWeight: "500",
		fontSize: 16,
		textAlign: "center",
		color: "#FFF"
	}
});
