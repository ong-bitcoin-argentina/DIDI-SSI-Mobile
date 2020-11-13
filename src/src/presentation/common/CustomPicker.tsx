import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle, Picker } from "react-native";
import { DidiText } from "../util/DidiText";
import colors from "../resources/colors";
const { Icon } = DidiText;
const { Small } = DidiText.Explanation;

type CustomPickerProps = {
	style?: ViewStyle;
	prefix?: string;
	onValueChange: any;
	selectedValue: any;
};

type CustomPickerState = {};

export default class CustomPicker extends Component<CustomPickerProps, CustomPickerState> {
	render() {
		const { prefix, selectedValue, onValueChange, children } = this.props;
		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableOpacity style={styles.pickerButton}>
					<View style={styles.pickerContainer}>
						{!!prefix && (
							<View style={{ flex: 1 }}>
								<Small style={styles.pickerLabel}>{prefix}</Small>
							</View>
						)}
						<View style={styles.selectorContainer}>
							<Picker selectedValue={selectedValue} style={styles.picker} onValueChange={onValueChange} mode="dialog">
								{children}
							</Picker>
						</View>
					</View>
					<Icon fontSize={22} color="black">
						arrow_drop_down
					</Icon>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	pickerLabel: {
		textAlign: "right",
		fontSize: 16,
		marginRight: 6
	},
	container: {
		borderRadius: 10,
		marginTop: 6,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: colors.border.light
	},
	pickerButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 18
	},
	pickerContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	picker: {
		height: "100%",
		flexDirection: "row"
	},
	selectorContainer: {
		flex: 2
	}
});
