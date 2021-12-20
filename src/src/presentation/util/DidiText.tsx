import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

import { AddChildren } from "../../util/ReactExtensions";

import colors from "../resources/colors";

type DidiFontStyle = Record<"bold" | "italic" | "regular" | "medium" | "info", TextStyle>;

const openSansFontStyle: DidiFontStyle = {
	regular: { fontFamily: "OpenSans-Regular" },
	medium: { fontFamily: "OpenSans-SemiBold" },
	bold: { fontFamily: "OpenSans-Bold" },
	italic: { fontFamily: "OpenSans-Italic" },
	info: { fontFamily: "Roboto-Regular" }
};
const fontStyle: DidiFontStyle = openSansFontStyle;

export const styleToUse = {
	navigationHeader: fontStyle.medium,
	didiTextInput: {
		...fontStyle.regular,
		fontSize: 16
	}
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
	},
	error: {
		color: colors.error
	}
};

const base: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	...fontStyle.regular,
	...color.dark
};

export const styles = {
	common: StyleSheet.create({
		large: {
			...base,
			fontSize: 22
		},
		normal: {
			...base
		},
		bold: {
			...base,
			...fontStyle.bold
		},
		medium: {
			...base,
			...fontStyle.medium
		},
		faded: {
			...base,
			...color.faded
		},
		small: {
			...base,
			fontSize: 16
		},
		tiny: {
			...base,
			fontSize: 13
		}
	}),
	validateIdentity: StyleSheet.create({
		title: {
			...base,
			...fontStyle.bold,
			fontSize: 22
		},
		stepNumber: {
			...base,
			...color.primary,
			...fontStyle.bold,
			fontSize: 22
		},
		totalNumber: {
			...base,
			...fontStyle.bold,
			fontSize: 16
		},
		enumerate: {
			...base,
			...color.primary,
			...fontStyle.bold,
			fontSize: 16
		},
		enumerationItem: {
			...base,
			fontSize: 16,
			textAlign: undefined
		},
		congrats: {
			...base,
			...color.primary
		},
		reminder: {
			...base,
			...color.faded,
			fontSize: 12
		}
	}),
	changePassword: StyleSheet.create({
		explanation: {
			...base,
			textAlign: undefined,
			fontSize: 16
		},
		error: {
			...base,
			...fontStyle.bold,
			...color.error,
			fontSize: 16
		},
		enumerationItem: {
			...base,
			textAlign: undefined,
			fontSize: 14
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
			...fontStyle.bold,
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
			...fontStyle.medium,
			fontSize: 13,
			textAlign: "right"
		},
		percentage: {
			...base,
			...fontStyle.medium,
			fontSize: 14,
			textAlign: "center"
		},
		warning: {
			...base,
			...fontStyle.bold,
			fontSize: 16,
			textAlign: undefined
		}
	}),
	activity: StyleSheet.create({
		title: {
			...base,
			...fontStyle.bold,
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
			...fontStyle.regular,
			fontSize: 13
		},
		name: {
			...color.light,
			...fontStyle.bold,
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
			...fontStyle.bold,
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
		italicTextButton: {
			...base,
			...fontStyle.italic,
			fontSize: 15
		},
		signupCloseButton: {
			...base,
			...color.light,
			fontSize: 20
		},
		buttonDisabled: {
			...base,
			...fontStyle.italic,
			...color.faded
		},
		buttonEnabled: {
			...base,
			...color.light,
			...fontStyle.medium
		},
		inputDescription: {
			...base,
			...color.faded,
			...fontStyle.info,
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
			...fontStyle.info,
			fontSize: 10
		},
		userDataHeader: {
			...base,
			...color.primary,
			...fontStyle.medium,
			fontSize: 20
		},
		tabNavigationTitle: {
			...base,
			...color.light,
			...fontStyle.medium,
			fontSize: 12
		},
		signupPasswordInfo: {
			...base,
			fontSize: 14
		}
	})
};

function textWith(style: TextStyle) {
	// eslint-disable-next-line react/display-name
	return (props: AddChildren<TextProps>) => {
		return <Text {...props} style={[style, props.style]} />;
	};
}

export const DidiText = {
	Title: textWith(styles.common.large),
	Small: textWith(styles.common.small),
	Explanation: {
		Normal: textWith(styles.common.normal),
		Emphasis: textWith(styles.common.bold),
		Faded: textWith(styles.common.faded),
		Small: textWith(styles.common.small),
		Tiny: textWith(styles.common.tiny)
	},
	ValidateIdentity: {
		Normal: textWith(styles.common.small),
		Title: textWith(styles.validateIdentity.title),
		Subtitle: textWith(styles.common.medium),
		StepNumber: textWith(styles.validateIdentity.stepNumber),
		TotalNumber: textWith(styles.validateIdentity.totalNumber),
		Enumerate: textWith(styles.validateIdentity.enumerate),
		EnumerationItem: textWith(styles.validateIdentity.enumerationItem),
		Congrats: textWith(styles.validateIdentity.congrats),
		Reminder: textWith(styles.validateIdentity.reminder)
	},
	ChangePassword: {
		Explanation: textWith(styles.changePassword.explanation),
		Error: textWith(styles.changePassword.error),
		Emphasis: textWith(styles.common.bold),
		EnumerationItem: textWith(styles.changePassword.enumerationItem)
	},
	Card: {
		Category: textWith(styles.card.category),
		Title: textWith(styles.card.title),
		Subtitle: textWith(styles.card.subtitle),
		Key: textWith(styles.card.key),
		Value: textWith(styles.card.value),
		Percentage: textWith(styles.card.percentage),
		Warning: textWith(styles.card.warning)
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
	// eslint-disable-next-line react/display-name
	Icon: (props: { fontSize: number; color?: string } & AddChildren<TextProps>) => {
		return (
			<Text
				{...props}
				style={[styles.component.icon, { color: props.color || "#FFFFFF", fontSize: props.fontSize }, props.style]}
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	Button: (props: { disabled: boolean } & AddChildren<TextProps>) => {
		return (
			<Text
				{...props}
				style={[props.disabled ? styles.component.buttonDisabled : styles.component.buttonEnabled, props.style]}
			/>
		);
	},
	ForgotPasswordButton: textWith(styles.component.italicTextButton),
	ResendCodeButton: textWith(styles.component.italicTextButton),
	SignupCloseButton: textWith(styles.component.signupCloseButton),
	InputDescription: textWith(styles.component.inputDescription),
	CameraExplanation: textWith(styles.component.cameraExplanation),
	ValidationState: textWith(styles.component.validationState),
	TabNavigationTitle: textWith(styles.component.tabNavigationTitle),
	SignupPasswordInfo: textWith(styles.component.signupPasswordInfo)
};
