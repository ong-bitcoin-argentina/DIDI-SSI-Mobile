import React, { Fragment } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	ImageSourcePropType,
	ViewProps,
	TextInputProps
} from "react-native";
import themes from "../styles/themes";

export interface DidiTextInputProps {
	viewProps?: ViewProps;

	tagImage: ImageSourcePropType;
	description: string;
	placeholder: NonNullable<TextInputProps["placeholder"]>;

	textInputProps?: TextInputProps;
}

export default class DidiTextInput extends React.Component<DidiTextInputProps> {
	public render() {
		const rootStyle = this.props.viewProps
			? [styles.root, this.props.viewProps.style]
			: styles.root;
		const textInputStyle = this.props.textInputProps
			? [styles.textInput, this.props.textInputProps.style]
			: styles.textInput;

		return (
			<View {...this.props.viewProps} style={rootStyle}>
				<Image style={styles.tagImage} source={this.props.tagImage} />
				<View style={styles.textContainer}>
					<Text style={styles.description}>{this.props.description}</Text>
					<TextInput
						{...this.props.textInputProps}
						style={textInputStyle}
						placeholder={this.props.placeholder}
					/>
					<View style={styles.underline} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		width: "80%",
		flexDirection: "row",
		alignItems: "center"
	},
	textContainer: {
		marginLeft: 30,
		flex: 1,
		flexDirection: "column"
	},
	textInput: {
		color: themes.foreground,
		height: 30
	},
	description: {
		color: themes.foregroundFaded,
		fontSize: 12
	},
	tagImage: {
		backgroundColor: themes.secondaryTheme.button,
		width: 25,
		height: 25
	},
	underline: {
		backgroundColor: themes.foregroundFaded,
		height: 1
	}
});
