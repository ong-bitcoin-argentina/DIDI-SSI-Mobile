import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { AddChildren } from "../../util/ReactExtensions";

import colors from "../resources/colors";

export const defaultFontFamily = "RobotoCondensed";

const color = {
	dark: {
		color: colors.text
	},
	light: {
		color: colors.primaryText
	},
	faded: {
		color: colors.textFaded
	},
	primary: {
		color: colors.primary
	}
};

const weight = {
	regular: {
		fontFamily: `${defaultFontFamily}-Regular`
	},
	medium: {
		fontFamily: `${defaultFontFamily}-Medium`
	},
	bold: {
		fontFamily: `${defaultFontFamily}-Bold`
	}
};

const base: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	...color.dark,
	...weight.regular
};

const styles = {
	explanation: StyleSheet.create({
		normal: {
			...base
		},
		emphasis: {
			...base,
			...weight.bold
		},
		faded: {
			...base,
			...color.faded
		}
	}),
	validateIdentity: StyleSheet.create({
		normal: {
			...base,
			fontSize: 16
		},
		title: {
			...base,
			...weight.bold,
			fontSize: 22
		},
		subtitle: {
			...base,
			...weight.medium,
			fontSize: 18
		},
		stepNumber: {
			...base,
			...weight.bold,
			...color.primary,
			fontSize: 22
		},
		totalNumber: {
			...base,
			...weight.bold,
			fontSize: 16
		},
		enumerate: {
			...base,
			...color.primary,
			...weight.bold,
			fontSize: 16
		}
	}),
	card: StyleSheet.create({
		category: {
			...base,
			fontSize: 12,
			textAlign: undefined
		},
		title: {
			...base,
			...weight.bold,
			fontSize: 16,
			textAlign: undefined
		},
		subtitle: {
			...base,
			fontSize: 12,
			textAlign: undefined
		},
		key: {
			...base,
			fontSize: 13,
			textAlign: "left"
		},
		value: {
			...base,
			...weight.medium,
			fontSize: 13,
			textAlign: "right"
		}
	}),
	component: StyleSheet.create({
		icon: {
			...base,
			fontFamily: "MaterialIcons-Regular"
		},
		buttonDisabled: {
			...base,
			...color.faded,
			fontStyle: "italic"
		},
		buttonEnabled: {
			...base,
			...color.light
		},
		inputDescription: {
			...base,
			...color.faded,
			textAlign: undefined,
			fontSize: 12
		},
		textInput: {
			...base,
			textAlign: undefined,
			fontSize: 16
		}
	})
};

function textWith(style: TextStyle) {
	return (props: AddChildren<TextProps>) => {
		return <Text {...props} style={[style, props.style]} />;
	};
}

export const DidiText = {
	Explanation: {
		Normal: textWith(styles.explanation.normal),
		Emphasis: textWith(styles.explanation.emphasis),
		Faded: textWith(styles.explanation.faded)
	},
	ValidateIdentity: {
		Normal: textWith(styles.validateIdentity.normal),
		Title: textWith(styles.validateIdentity.title),
		Subtitle: textWith(styles.validateIdentity.subtitle),
		StepNumber: textWith(styles.validateIdentity.stepNumber),
		TotalNumber: textWith(styles.validateIdentity.totalNumber),
		Enumerate: textWith(styles.validateIdentity.enumerate)
	},
	Card: {
		Category: textWith(styles.card.category),
		Title: textWith(styles.card.title),
		Subtitle: textWith(styles.card.subtitle),
		Key: textWith(styles.card.key),
		Value: textWith(styles.card.value)
	},
	Icon: (props: { fontSize: number; color?: string } & AddChildren<TextProps>) => {
		return (
			<Text
				{...props}
				style={[styles.component.icon, { color: props.color || "#FFFFFF", fontSize: props.fontSize }, props.style]}
			/>
		);
	},
	Button: (props: { disabled: boolean } & AddChildren<TextProps>) => {
		return (
			<Text
				{...props}
				style={[props.disabled ? styles.component.buttonDisabled : styles.component.buttonEnabled, props.style]}
			/>
		);
	},
	Input: {
		Description: textWith(styles.component.inputDescription)
	}
};
