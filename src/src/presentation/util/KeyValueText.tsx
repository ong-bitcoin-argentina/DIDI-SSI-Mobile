import React, { Component } from "react";
import { Text, StyleSheet, TextStyle, Dimensions } from "react-native";
import { DidiText } from "./DidiText";
import colors from "../resources/colors";
const { Small } = DidiText.Explanation;
const widthScreen = Dimensions.get("screen").width;

type Props = {
	name: string;
	value: string;
	textStyle?: TextStyle;
};

export default class KeyValueText extends Component<Props> {
	render() {
		const { name, value, textStyle } = this.props;
		return (
			<Text style={textStyle}>
				<Small style={[styles.key, textStyle]}>{`${name}: `}</Small>
				<Small style={[styles.value, textStyle]}>{value}</Small>
			</Text>
		);
	}
}

const value = {
	marginTop: 4,
	fontSize: widthScreen < 360 ? 15 : 17,
	color: colors.darkText
};

const styles = StyleSheet.create({
	value,
	key: {
		...value,
		fontWeight: "bold"
	}
});
