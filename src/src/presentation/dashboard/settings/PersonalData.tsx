import { ViewProps, StyleProp, TextStyle, View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import strings from "../../resources/strings";
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
			case PersonalDataStatus.Null:
				return null;
		}
	}

	private renderState() {
		return <View style={styles.iconContainer}>{this.getState()}</View>;
	}

	render() {
		return (
			<View {...this.props} style={[styles.data, this.props.style]}>
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
		fontWeight: "normal",
		fontSize: 15
	},
	label: {
		fontWeight: "normal",
		fontSize: 12,
		color: colors.textFaded
	},

	stateContainer: {
		backgroundColor: colors.lightBackground,
		textAlign: "center",
		flexDirection: "row",
		width: 90,
		paddingVertical: 3,
		borderRadius: 20,
		paddingLeft: 5
	},
	stateContainerRejected: {
		backgroundColor: colors.error
	},

	stateText: {
		fontSize: 10,
		marginLeft: 5,
		alignSelf: "flex-end",
		textAlignVertical: "center"
	},
	stateIcon: {
		fontSize: 10,
		alignSelf: "flex-start",
		textAlignVertical: "center",
		textAlign: "center",
		width: 15,
		height: 15,
		borderRadius: 7.5
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
