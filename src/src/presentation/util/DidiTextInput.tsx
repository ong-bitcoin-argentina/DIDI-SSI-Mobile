import React, { Fragment } from "react";
import { StyleSheet, Text, View, Image, TextInput, ImageSourcePropType, ViewProps, TextInputProps } from "react-native";
import themes from "../resources/themes";
import DidiTheme from "../resources/DidiTheme";

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
		const textInputStyle = this.props.textInputProps
			? [style.textInput, this.props.textInputProps.style]
			: style.textInput;

		return (
			<View {...this.props.viewProps} style={rootStyle}>
				{this.props.tagImage && <Image style={style.tagImage} source={this.props.tagImage} />}
				<View style={style.textContainer}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<View>
							<Text style={style.description}>{this.props.description}</Text>
							<TextInput {...this.props.textInputProps} style={textInputStyle} placeholder={this.props.placeholder} />
						</View>
						{this.props.stateIndicator}
					</View>
					<View style={style.underline} />
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
		textContainer: {
			marginLeft: 30,
			flex: 1,
			flexDirection: "column"
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
			height: 25
		},
		stateContainer: {},
		underline: {
			backgroundColor: theme.foregroundFaded,
			height: 1,
			marginBottom: 10,
			marginTop: 6
		}
	});
}
