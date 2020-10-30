import React, { PureComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import colors from "../../resources/colors";

type Props = {
	style?: ViewStyle;
	color?: string;
};

export default class Divider extends PureComponent<Props> {
	render() {
		const { style, color } = this.props;
		return <View style={[styles.divider, { backgroundColor: color ?? colors.darkGray }, style]}></View>;
	}
}

const styles = StyleSheet.create({
	divider: {
		height: 1,
		backgroundColor: colors.darkGray,
		marginVertical: 8
	}
});
