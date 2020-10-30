import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";

type Props = {
	icon: string;
	label: string;
	style?: ViewStyle;
	onPress: any;
};

type State = {};

class Option extends Component<Props, State> {
	render() {
		const { onPress, icon, label, style } = this.props;
		return (
			<TouchableHighlight style={[styles.row, style]} onPress={onPress} underlayColor={colors.lightBackground}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<DidiText.Icon style={styles.leftIcon} fontSize={22}>
							{icon}
						</DidiText.Icon>
						<Text style={styles.text}>{label}</Text>
					</View>
					<DidiText.Icon style={styles.rightIcon} fontSize={22}>
						chevron_right
					</DidiText.Icon>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	leftIcon: {
		color: colors.darkGray,
		marginRight: 14
	},
	rightIcon: {
		color: colors.darkGray
	},
	row: {
		marginBottom: 8,
		paddingVertical: 18,
		paddingHorizontal: 8
	},
	text: {
		color: colors.darkGray,
		fontSize: 18,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center"
	}
});

export default Option;
