import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { AddChildren } from "../../util/ReactExtensions";

import colors from "../resources/colors";

export const DidiText = {
	Explanation: {
		Normal: (props: AddChildren<TextProps>) => {
			return <Text {...props} style={[styles.normal, props.style]} />;
		},
		Emphasis: (props: AddChildren<TextProps>) => {
			return <Text {...props} style={[styles.emphasis, props.style]} />;
		},
		Faded: (props: AddChildren<TextProps>) => {
			return <Text {...props} style={[styles.faded, props.style]} />;
		}
	},
	Icon: (props: { fontSize: number; color?: string } & AddChildren<TextProps>) => {
		return (
			<Text
				{...props}
				style={[styles.icon, { color: props.color || "#FFFFFF", fontSize: props.fontSize }, props.style]}
			/>
		);
	}
};

const baseTextStyle: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	color: colors.text
};

const styles = StyleSheet.create({
	normal: baseTextStyle,
	emphasis: {
		...baseTextStyle,
		fontWeight: "bold"
	},
	faded: {
		...baseTextStyle,
		color: colors.textFaded
	},
	icon: {
		textAlign: "center",
		fontFamily: "MaterialIcons-Regular"
	}
});
