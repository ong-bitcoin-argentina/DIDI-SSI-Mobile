import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
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
			<TouchableOpacity style={[styles.row, style]} onPress={onPress}>
				<View style={styles.innerView}>
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
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	leftIcon: {
		color: colors.darkGray,
		marginRight: 14
	},
	innerView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	rightIcon: {
		color: colors.darkGray
	},
	row: {
		marginBottom: 8,
		paddingVertical: 15,
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
