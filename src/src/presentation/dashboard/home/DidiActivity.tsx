import React, { Component } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

import { DidiText } from "../../util/DidiText";

import { RecentActivity } from "../../../model/RecentActivity";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

interface DidiActivityProps extends ViewProps {
	activity: RecentActivity;
}

interface ViewableRecentActivity {
	icon: string;
	title: string;
	description: string;
	date: string;
}

function convertToViewable(recentActivity: RecentActivity): ViewableRecentActivity {
	const title = recentActivity.credentialTitle.join(", ");

	const date = new Date(recentActivity.date);
	const displayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

	return {
		...strings.activityHistory[recentActivity.type](title),
		date: displayDate
	};
}

export default class DidiActivity extends Component<DidiActivityProps, {}> {
	render() {
		const activity = convertToViewable(this.props.activity);
		return (
			<View {...this.props} style={[styles.activity, this.props.style]}>
				<View style={styles.body}>
					<View style={styles.iconContainer}>
						<DidiText.Icon fontSize={20}>{activity.icon}</DidiText.Icon>
					</View>

					<View style={styles.rowContainer}>
						<View style={styles.row}>
							<DidiText.Activity.Title style={styles.rowStart}>{activity.title}</DidiText.Activity.Title>
							<DidiText.Activity.Date>{activity.date}</DidiText.Activity.Date>
						</View>
						<DidiText.Activity.Description style={styles.rowStart}>
							{activity.description}
						</DidiText.Activity.Description>
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
