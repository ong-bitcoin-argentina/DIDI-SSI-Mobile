import React, { PureComponent } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import colors from "../../resources/colors";

type Props = {
	style?: ViewStyle;
};

export default class Divider extends PureComponent<Props> {
	render() {
		return <View style={[styles.divider, this.props.style]}></View>;
	}
}

const styles = StyleSheet.create({
	divider: {
		height: 1,
		backgroundColor: colors.darkGray,
		marginVertical: 8
	}
});
