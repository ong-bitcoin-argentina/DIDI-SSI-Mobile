import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle, ViewProps } from "react-native";
import React from "react";

export interface DidiCardProps extends ViewProps {
	icon: ImageSourcePropType;
	image?: ImageSourcePropType;
	category: string;
	title: string;
	subTitle: string;
	textStyle?: StyleProp<TextStyle>;
}

export default class DidiCard extends Component<DidiCardProps, {}> {
	private renderTitle() {
		return (
			<View style={styles.headerData}>
				<Text style={[styles.category, this.props.textStyle]}>{this.props.category}</Text>
				<Text style={[styles.title, this.props.textStyle]}>{this.props.title}</Text>
				<Text style={[styles.subTitle, this.props.textStyle]}>{this.props.subTitle}</Text>
			</View>
		);
	}

	private renderIcon() {
		return (
			<View style={styles.headerIconContainer}>
				<Image style={styles.icon} source={this.props.icon} />
			</View>
		);
	}

	render() {
		return (
			<View {...this.props} style={[styles.body, styles.card, this.props.style]}>
				<View style={styles.headerContainer}>
					{this.renderIcon()}
					<View style={styles.textContainer}>
						{this.renderTitle()}
						{this.props.children}
					</View>
				</View>
				{this.props.image && (
					<View style={styles.imageContainer}>
						<Image style={styles.image} source={this.props.image} />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		marginHorizontal: 25,
		marginVertical: 25,
		alignItems: "stretch",
		justifyContent: "flex-start",
		flexGrow: 1
	},
	textContainer: {
		flexDirection: "column",
		flexGrow: 1,
		justifyContent: "space-between"
	},
	card: {
		marginBottom: 10,
		minHeight: 180
	},
	data: {
		justifyContent: "center"
	},
	body: {
		borderRadius: 10,
		flexDirection: "column",
		flex: 0
	},
	headerIconContainer: {
		justifyContent: "flex-start"
	},
	icon: {
		height: 30,
		width: 27,
		marginRight: 25,
		resizeMode: "contain"
	},
	headerData: {
		textAlign: "left",
		justifyContent: "center",
		marginBottom: 10
	},
	category: {
		fontWeight: "500",
		fontSize: 12
	},
	title: {
		fontWeight: "bold",
		fontSize: 16
	},
	subTitle: {
		fontSize: 12
	},

	imageContainer: {
		position: "absolute",
		top: 10,
		right: 10
	},
	image: {
		height: 64,
		width: 64
	}
});
