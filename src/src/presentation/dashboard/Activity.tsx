import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle } from "react-native";
import React from "react";

interface DidiCardProps {
	icon: ImageSourcePropType;
	title: string;
	description: string;
	state: string;
	date: string;
	textStyles?: StyleProp<TextStyle>;
	style?: StyleProp<TextStyle>;
}

export default class DidiActivity extends Component<DidiCardProps, {}> {
	private renderTitle() {
		return (
			<View style={styles.titleData}>
				<Text style={[styles.title, this.props.textStyles]}>{this.props.title}</Text>
				<Text style={[styles.subTitle, this.props.textStyles]}>{this.props.description}</Text>
			</View>
		);
	}

	private renderState() {
		return (
			<View style={styles.stateData}>
				<Text style={[styles.title, this.props.textStyles]}>{this.props.state}</Text>
				<Text style={[styles.subTitle, this.props.textStyles]}>{this.props.date}</Text>
			</View>
		);
	}

	private renderIcon() {
		return (
			<View style={styles.iconContainer}>
				<Image style={styles.icon} source={this.props.icon} />
			</View>
		);
	}

	render() {
		return (
			<Fragment>
				<View style={[styles.activity, this.props.style]}>
					<View style={styles.body}>
						{this.renderIcon()}
						<View style={styles.column}>{this.renderTitle()}</View>
						<View style={styles.column}>{this.renderState()}</View>
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
	activity: {
		flexDirection: "column",
		flex: 0
	},
	iconContainer: {
		justifyContent: "flex-start"
	},
	icon: {
		height: 40,
		width: 40,
		marginRight: 25
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
	subTitle: {
		fontWeight: "500",
		fontSize: 12
	},
	title: {
		fontWeight: "bold",
		fontSize: 16
	}
});
