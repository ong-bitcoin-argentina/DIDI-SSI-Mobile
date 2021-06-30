import React from "react";
import { Image, ImageSourcePropType, StyleSheet, TextInput, TextInputProps, View, ViewProps } from "react-native";

import DidiTheme from "../resources/DidiTheme";
import strings from "../resources/strings";
import themes from "../resources/themes";

import { DidiText, styleToUse } from "./DidiText";

export interface DidiTextInputProps {
	theme?: DidiTheme;
	viewProps?: ViewProps;

	tagImage?: ImageSourcePropType;
	description: string;
	placeholder: NonNullable<TextInputProps["placeholder"]>;

	stateIndicator?: JSX.Element;
	textInputProps?: TextInputProps;
	maxLength?: number;
	editable?: boolean;
}

type BaseProps = {
	onChangeText: (text: string, valid?: boolean, length?: number) => void;
};

export default class DidiTextInput extends React.Component<DidiTextInputProps> {
	public render() {
		const theme = this.props.theme || themes.primaryTheme;
		const style = styles(theme);
		const rootStyle = this.props.viewProps ? [style.root, this.props.viewProps.style] : style.root;
		const textInputProps = this.props.textInputProps || {};
		const textInputStyle = this.props.textInputProps
			? [style.textInput, this.props.textInputProps.style]
			: style.textInput;
		const isEditable = this.props.editable === false ? false : true;

		return (
			<View {...this.props.viewProps} style={rootStyle}>
				{this.props.tagImage && <Image style={style.tagImage} source={this.props.tagImage} />}
				<View style={style.lineContainer}>
					<View style={style.stateContainer}>
						<View style={style.inputContainer}>
							<DidiText.InputDescription>{this.props.description}</DidiText.InputDescription>
							<TextInput
								{...textInputProps}
								style={textInputStyle}
								placeholder={this.props.placeholder}
								maxLength={this.props.maxLength}
								editable={isEditable}
							/>
						</View>
						{this.props.stateIndicator}
					</View>
					{textInputProps.editable !== false && <View style={style.underline} />}
				</View>
			</View>
		);
	}

	static FirstName = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.firstName.description}
				placeholder={strings.textInput.firstName.placeholder}
				textInputProps={{
					onChangeText: props.onChangeText
				}}
			/>
		);
	};

	static LastName = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.lastName.description}
				placeholder={strings.textInput.lastName.placeholder}
				textInputProps={{
					onChangeText: props.onChangeText
				}}
			/>
		);
	};

	static DNI = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.DNI.description}
				placeholder={strings.textInput.DNI.placeholder}
				textInputProps={{
					keyboardType: "number-pad",
					onChangeText: props.onChangeText
				}}
				maxLength={8}
			/>
		);
	};

	static Email = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.email.description}
				placeholder={strings.textInput.email.placeholder}
				tagImage={require("../resources/images/email.png")}
				textInputProps={{
					keyboardType: "email-address",
					autoCapitalize: "none",
					onChangeText: props.onChangeText
				}}
			/>
		);
	};

	static VerificationCode = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.verificationCode.description}
				placeholder={strings.textInput.verificationCode.placeholder}
				tagImage={require("../resources/images/phone.png")}
				textInputProps={{
					keyboardType: "number-pad",
					onChangeText: props.onChangeText
				}}
			/>
		);
	};

	static PhoneNumber = (props: BaseProps) => {
		return (
			<DidiTextInput
				description={strings.textInput.cellPhoneNumber.description}
				placeholder={strings.textInput.cellPhoneNumber.placeholder}
				tagImage={require("../resources/images/phone.png")}
				maxLength={13}
				textInputProps={{
					keyboardType: "phone-pad",
					onChangeText: text => props.onChangeText(text),
					style: {
						fontSize: 14
					}
				}}
			/>
		);
	};

	static Password = (props: {
		onChangeText: (text: string) => void;
		descriptionType: "BASIC" | "OLD" | "NEW" | "REPEAT";
		stateIndicator?: DidiTextInputProps["stateIndicator"];
	}) => {
		return (
			<DidiTextInput
				description={strings.textInput.password[props.descriptionType]}
				placeholder=""
				tagImage={require("../resources/images/key.png")}
				stateIndicator={props.stateIndicator}
				textInputProps={{
					secureTextEntry: true,
					onChangeText: props.onChangeText
				}}
			/>
		);
	};
}

function styles(theme: DidiTheme) {
	return StyleSheet.create({
		root: {
			flexDirection: "row",
			alignItems: "center"
		},
		inputContainer: {
			flex: 1
		},
		stateContainer: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 6
		},
		lineContainer: {
			flex: 1,
			flexDirection: "column",
			marginBottom: 10
		},
		textInput: {
			color: theme.foreground,
			paddingTop: 6,
			paddingBottom: 0,
			...styleToUse.didiTextInput
		},
		tagImage: {
			width: 25,
			height: 25,
			marginRight: 30
		},
		underline: {
			backgroundColor: theme.foregroundFaded,
			height: 1
		}
	});
}
