import React, { PureComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import colors from "../../resources/colors";

type Props = {
	style?: ViewStyle;
	color?: string;
	height?: number;
};

export default class Divider extends PureComponent<Props> {
	render() {
		const { style, color, height } = this.props;
		const backgroundColor = color ?? colors.darkGray;
		const finalHeight = height ? height : 1;
		const finalStyle = [styles.divider, { backgroundColor, height: finalHeight }, style];
		return <View style={finalStyle}></View>;
	}
}

const styles = StyleSheet.create({
	divider: {
		backgroundColor: colors.darkGray,
		marginVertical: 8
	}
});
