import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle } from "react-native";
import React from "react";

export enum PersonalDataStatus {
	Approved = "Approved",
	Pending = "Pending",
	Rejected = "Rejected",
	Null = ""
}

interface PersonalDataProps {
	label: string;
	value: string;
	state: PersonalDataStatus;

	style?: StyleProp<TextStyle>;
	textStyles?: StyleProp<TextStyle>;
}

export default class PersonalData extends Component<PersonalDataProps, {}> {
	private renderData() {
		return (
			<View style={styles.labelAndData}>
				<Text style={[styles.label, this.props.textStyles]}>{this.props.label}</Text>
				<Text style={[styles.value, this.props.textStyles]}>{this.props.value}</Text>
			</View>
		);
	}

	private renderIcon() {
		return <View style={styles.iconContainer}>{/* <Image style={styles.icon} source={this.props.icon} /> */}</View>;
	}

	render() {
		return (
			<Fragment>
				<View style={[styles.data, this.props.style]}>
					<View style={styles.body}>
						<View style={styles.column}>{this.renderData()}</View>
						{this.renderIcon()}
					</View>
				</View>
			</Fragment>
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
		fontWeight: "500",
		fontSize: 12
	},
	label: {
		fontWeight: "bold",
		fontSize: 16
	}
});
