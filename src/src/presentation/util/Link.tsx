import React, { Component } from "react";
import { Linking, Text, StyleSheet } from "react-native";
import { styles } from "./DidiText";

type LinkProps = {
	url: string;
	style?: object;
};

export default class Link extends Component<LinkProps> {
	render() {
		return (
			<Text
				{...this.props}
				style={[internalStyles.link, styles.common.small, this.props.style]}
				onPress={() => Linking.openURL(this.props.url)}
			/>
		);
	}
}

const internalStyles = StyleSheet.create({
	link: {
		textDecorationLine: "underline"
	}
});
