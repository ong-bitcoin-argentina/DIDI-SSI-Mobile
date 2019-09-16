import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle, ViewProps } from "react-native";
import React from "react";
import colors from "../../resources/colors";

export enum PersonalDataStatus {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected",
	Null = ""
}

interface PersonalDataProps extends ViewProps {
	label: string;
	value: string;
	state: PersonalDataStatus;

	textStyle?: StyleProp<TextStyle>;
}

export default class PersonalData extends Component<PersonalDataProps, {}> {
	private renderData() {
		return (
			<View style={styles.labelAndData}>
				<Text style={[styles.label, this.props.textStyle]}>{this.props.label}</Text>
				<Text style={[styles.value, this.props.textStyle]}>{this.props.value}</Text>
			</View>
		);
	}

	private renderIcon() {
		return <View style={styles.iconContainer}>{/* <Image style={styles.icon} source={this.props.icon} /> */}</View>;
	}

	render() {
		return (
			<View {...this.props} style={[styles.data, this.props.style]}>
				<View style={styles.body}>
					<View style={styles.column}>{this.renderData()}</View>
					{this.renderIcon()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		flexDirection: "row",
		marginHorizontal: 25,
		marginVertical: 10,
		alignItems: "stretch",
		justifyContent: "flex-start",
		flexGrow: 1
	},
	data: {
		flexDirection: "column",
		flex: 0
	},
	iconContainer: {
		justifyContent: "flex-end"
	},
	icon: {
		height: 40,
		width: 40,
		marginLeft: 25
	},
	column: {
		flexDirection: "column",
		flex: 1
	},
	labelAndData: {
		textAlign: "left",
		justifyContent: "flex-start",
		flex: 1
	},
	value: {
		fontWeight: "normal",
		fontSize: 15
	},
	label: {
		fontWeight: "normal",
		fontSize: 12,
		color: colors.textFaded
	}
});
