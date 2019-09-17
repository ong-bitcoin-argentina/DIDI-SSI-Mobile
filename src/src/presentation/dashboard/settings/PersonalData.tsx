import { Component } from "react";
import { Text, View, StyleProp, TextStyle, StyleSheet } from "react-native";
import React from "react";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

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

	private getState() {
		switch (this.props.state) {
			case PersonalDataStatus.Approved:
				return (
					<View style={styles.stateContainer}>
						<Text style={[styles.stateIcon, styles.stateIconApproved]}>✓</Text>
						<Text style={styles.stateText}>{strings.dashboard.userData.states.approved}</Text>
					</View>
				);
			case PersonalDataStatus.Pending:
				return (
					<View style={styles.stateContainer}>
						<Text style={[styles.stateIcon, styles.stateIconPending]}>!</Text>
						<Text style={styles.stateText}>{strings.dashboard.userData.states.pending}</Text>
					</View>
				);
			case PersonalDataStatus.Rejected:
				return (
					<View style={[styles.stateContainer, styles.stateContainerRejected]}>
						<Text style={[styles.stateIcon, styles.stateIconRejected]}>X</Text>
						<Text style={styles.stateText}>{strings.dashboard.userData.states.rejected}</Text>
					</View>
				);
			default:
				return <Text></Text>;
		}
	}

	private renderState() {
		return <View style={styles.iconContainer}>{this.getState()}</View>;
	}

	render() {
		return (
			<View style={[styles.data, this.props.style]}>
				<View style={styles.body}>
					<View style={styles.column}>{this.renderData()}</View>
					{this.renderState()}
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
		fontWeight: "500",
		fontSize: 12
	},
	label: {
		fontWeight: "bold",
		fontSize: 16
	},

	stateContainer: {
		backgroundColor: colors.lightBackground,
		textAlign: "center",
		flexDirection: "row",
		width: 120,
		borderRadius: 20,
		paddingLeft: 5,
		paddingRight: 5
	},
	stateContainerRejected: {
		backgroundColor: colors.error
	},

	stateText: {
		marginBottom: 5,
		alignSelf: "flex-end"
	},
	stateIcon: {
		alignSelf: "flex-start",
		textAlign: "center",
		width: 20,
		borderRadius: 20,
		margin: 5
	},
	stateIconApproved: {
		backgroundColor: "#6ecc62",
		color: colors.secondaryText
	},
	stateIconPending: {
		backgroundColor: "#e9c622"
	},
	stateIconRejected: {
		backgroundColor: "#e03c7a",
		color: colors.secondaryText
	}
});
