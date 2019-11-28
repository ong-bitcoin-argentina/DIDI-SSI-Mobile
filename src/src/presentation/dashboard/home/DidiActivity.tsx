import React, { Component } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

import { DidiText } from "../../util/DidiText";

import { RecentActivity } from "../../../model/RecentActivity";
import colors from "../../resources/colors";

interface DidiActivityProps extends ViewProps {
	activity: RecentActivity;
}

export default class DidiActivity extends Component<DidiActivityProps, {}> {
	render() {
		return (
			<View {...this.props} style={[styles.activity, this.props.style]}>
				<View style={styles.body}>
					<View style={styles.iconContainer}>
						<DidiText.Icon fontSize={20}>{this.props.activity.icon}</DidiText.Icon>
					</View>

					<View style={styles.rowContainer}>
						<View style={styles.row}>
							<DidiText.Activity.Title style={styles.rowStart}>{this.props.activity.title}</DidiText.Activity.Title>
							<DidiText.Activity.State>{this.props.activity.state}</DidiText.Activity.State>
						</View>
						<View style={styles.row}>
							<DidiText.Activity.Description style={styles.rowStart}>
								{this.props.activity.description}
							</DidiText.Activity.Description>
							<DidiText.Activity.Date>{this.props.activity.date}</DidiText.Activity.Date>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		flexDirection: "row",
		marginHorizontal: 16,
		marginVertical: 16,
		alignItems: "stretch",
		justifyContent: "flex-start",
		flexGrow: 1
	},
	activity: {
		flexDirection: "column",
		flex: 0
	},
	iconContainer: {
		justifyContent: "center",
		alignItems: "center",
		height: 32,
		width: 32,
		marginRight: 12,
		borderRadius: 16,
		backgroundColor: colors.secondary
	},
	rowContainer: {
		flex: 1,
		alignContent: "stretch"
	},
	row: {
		flexDirection: "row",
		flex: 1,
		alignContent: "space-around"
	},
	rowStart: {
		flex: 1
	}
});
