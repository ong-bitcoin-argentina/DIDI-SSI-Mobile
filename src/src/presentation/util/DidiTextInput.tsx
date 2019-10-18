import React, { Fragment } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, TextInput, TextInputProps, View, ViewProps } from "react-native";

import DidiTheme from "../resources/DidiTheme";
import themes from "../resources/themes";

export interface DidiTextInputProps {
	theme?: DidiTheme;
	viewProps?: ViewProps;

	tagImage?: ImageSourcePropType;
	description: string;
	placeholder: NonNullable<TextInputProps["placeholder"]>;

	stateIndicator?: JSX.Element;
	textInputProps?: TextInputProps;
}

export default class DidiTextInput extends React.Component<DidiTextInputProps> {
	public render() {
		const theme = this.props.theme ? this.props.theme : themes.primaryTheme;
		const style = styles(theme);
		const rootStyle = this.props.viewProps ? [style.root, this.props.viewProps.style] : style.root;
		const textInputProps = this.props.textInputProps || {};
		const textInputStyle = this.props.textInputProps
			? [style.textInput, this.props.textInputProps.style]
			: style.textInput;

		return (
			<View {...this.props.viewProps} style={rootStyle}>
				{this.props.tagImage && <Image style={style.tagImage} source={this.props.tagImage} />}
				<View style={style.lineContainer}>
					<View style={style.stateContainer}>
						<View style={style.inputContainer}>
							<Text style={style.description}>{this.props.description}</Text>
							<TextInput {...textInputProps} style={textInputStyle} placeholder={this.props.placeholder} />
						</View>
						{this.props.stateIndicator}
					</View>
					{textInputProps.editable !== false && <View style={style.underline} />}
				</View>
			</View>
		);
	}
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
			fontSize: 16
		},
		description: {
			color: theme.foregroundFaded,
			fontSize: 12
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
