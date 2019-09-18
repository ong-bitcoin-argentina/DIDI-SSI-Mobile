import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle, ViewProps } from "react-native";
import React from "react";
import colors from "../resources/colors";
import { RecentActivity } from "../../model/StoreContent";

interface DidiActivityProps extends ViewProps {
	activity: RecentActivity;
	textStyles?: StyleProp<TextStyle>;
}

export default class DidiActivity extends Component<DidiActivityProps, {}> {
	private renderTitle() {
		return (
			<View style={styles.titleData}>
				<Text style={[styles.title, this.props.textStyles]}>{this.props.activity.title}</Text>
				<Text style={[styles.description, this.props.textStyles]}>{this.props.activity.description}</Text>
			</View>
		);
	}

	private renderState() {
		return (
			<View style={styles.stateData}>
				<Text style={[styles.state, this.props.textStyles]}>{this.props.activity.state}</Text>
				<Text style={[styles.date, this.props.textStyles]}>{this.props.activity.date}</Text>
			</View>
		);
	}

	private renderIcon() {
		return (
			<View style={styles.iconContainer}>
				<Image style={styles.icon} source={this.props.activity.icon} />
			</View>
		);
	}

	render() {
		return (
			<View {...this.props} style={[styles.activity, this.props.style]}>
				<View style={styles.body}>
					{this.renderIcon()}
					<View style={styles.column}>{this.renderTitle()}</View>
					<View style={styles.column}>{this.renderState()}</View>
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
		justifyContent: "flex-start"
	},
	icon: {
		height: 32,
		width: 32,
		marginRight: 12
	},
	titleData: {
		textAlign: "left",
		justifyContent: "center",
		flex: 1
	},
	stateData: {
		textAlign: "right",
		alignSelf: "flex-end",
		justifyContent: "flex-end"
	},
	column: {
		flexDirection: "column",
		flex: 1
	},
	title: {
		fontWeight: "bold",
		fontSize: 14
	},
	description: {
		fontWeight: "normal",
		fontSize: 12,
		color: colors.textFaded
	},
	state: {
		fontWeight: "bold",
		fontSize: 14,
		textAlign: "right"
	},
	date: {
		fontWeight: "normal",
		fontSize: 12,
		color: colors.textFaded,
		textAlign: "right"
	}
});
