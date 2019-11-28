import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { AddChildren } from "../../util/ReactExtensions";

import colors from "../resources/colors";

const defaultFontFamily = "Roboto";
const fonts = {
	regular: `${defaultFontFamily}-Regular`,
	medium: `${defaultFontFamily}-Medium`,
	bold: `${defaultFontFamily}-Bold`,

	robotoRegular: "Roboto-Regular"
};

export const fontsToUse = {
	navigationHeader: fonts.medium,
	didiTextInput: fonts.regular,
	navBarOverflow: fonts.medium
};

const italicStyle: { fontFamily: string; fontStyle: "italic" } = {
	fontFamily: fonts.regular,
	fontStyle: "italic"
};

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
		color: colors.primaryShadow
	}
};

const base: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	fontFamily: fonts.regular,
	...color.dark
};

const styles = {
	explanation: StyleSheet.create({
		normal: {
			...base
		},
		emphasis: {
			...base,
			fontFamily: fonts.bold
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
			fontFamily: fonts.bold,
			fontSize: 22
		},
		subtitle: {
			...base,
			fontFamily: fonts.medium,
			fontSize: 18
		},
		stepNumber: {
			...base,
			...color.primary,
			fontFamily: fonts.bold,
			fontSize: 22
		},
		totalNumber: {
			...base,
			fontFamily: fonts.bold,
			fontSize: 16
		},
		enumerate: {
			...base,
			...color.primary,
			fontFamily: fonts.bold,
			fontSize: 16
		},
		congrats: {
			...base,
			...color.primary,
			fontSize: 18
		},
		reminder: {
			...base,
			...color.faded,
			fontSize: 12
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
			fontFamily: fonts.bold,
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
			fontFamily: fonts.medium,
			fontSize: 13,
			textAlign: "right"
		}
	}),
	activity: StyleSheet.create({
		title: {
			...base,
			fontFamily: fonts.bold,
			fontSize: 14,
			textAlign: undefined
		},
		faded: {
			...base,
			...color.faded,
			fontSize: 12,
			textAlign: undefined
		}
	}),
	dashboardHeader: StyleSheet.create({
		hello: {
			...color.light,
			fontFamily: fonts.regular,
			fontSize: 13
		},
		name: {
			...color.light,
			fontFamily: fonts.bold,
			fontSize: 13
		}
	}),
	settings: StyleSheet.create({
		name: {
			...base,
			textAlign: undefined
		},
		idLabel: {
			...base,
			...color.primary,
			fontFamily: fonts.bold,
			textAlign: undefined,
			fontSize: 12
		},
		idContent: {
			...base,
			textAlign: undefined,
			fontSize: 12
		},
		button: {
			...base,
			textAlign: undefined,
			fontSize: 14
		}
	}),
	component: StyleSheet.create({
		icon: {
			...base,
			fontFamily: "MaterialIcons-Regular"
		},
		forgotPasswordButton: {
			...base,
			...italicStyle,
			fontSize: 15
		},
		signupCloseButton: {
			...base,
			...color.light,
			fontSize: 20
		},
		buttonDisabled: {
			...base,
			...italicStyle,
			...color.faded
		},
		buttonEnabled: {
			...base,
			...color.light,
			fontFamily: fonts.medium
		},
		inputDescription: {
			...base,
			...color.faded,
			fontFamily: fonts.robotoRegular,
			textAlign: undefined,
			fontSize: 12
		},
		textInput: {
			...base,
			textAlign: undefined,
			fontSize: 16
		},
		cameraExplanation: {
			...base,
			...color.light,
			fontSize: 20
		},
		validationState: {
			...base,
			fontFamily: fonts.robotoRegular,
			fontSize: 10
		},
		userDataHeader: {
			...base,
			...color.primary,
			fontFamily: fonts.medium,
			fontSize: 20
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
		Enumerate: textWith(styles.validateIdentity.enumerate),
		Congrats: textWith(styles.validateIdentity.congrats),
		Reminder: textWith(styles.validateIdentity.reminder)
	},
	Card: {
		Category: textWith(styles.card.category),
		Title: textWith(styles.card.title),
		Subtitle: textWith(styles.card.subtitle),
		Key: textWith(styles.card.key),
		Value: textWith(styles.card.value)
	},
	Activity: {
		Title: textWith(styles.activity.title),
		State: textWith(styles.activity.title),
		Description: textWith(styles.activity.faded),
		Date: textWith(styles.activity.faded)
	},
	DashboardHeader: {
		Hello: textWith(styles.dashboardHeader.hello),
		Name: textWith(styles.dashboardHeader.name)
	},
	Settings: {
		Name: textWith(styles.settings.name),
		IdLabel: textWith(styles.settings.idLabel),
		IdContent: textWith(styles.settings.idContent),
		Button: textWith(styles.settings.button)
	},
	UserData: {
		HeaderName: textWith(styles.component.userDataHeader)
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
	ForgotPasswordButton: textWith(styles.component.forgotPasswordButton),
	SignupCloseButton: textWith(styles.component.signupCloseButton),
	InputDescription: textWith(styles.component.inputDescription),
	CameraExplanation: textWith(styles.component.cameraExplanation),
	ValidationState: textWith(styles.component.validationState)
};
