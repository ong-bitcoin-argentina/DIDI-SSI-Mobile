import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle } from "react-native";
import React from "react";

interface DidiCardProps {
	icon: ImageSourcePropType;
	image: ImageSourcePropType;
	category: string;
	title: string;
	subTitle: string;
	cardStyles?: StyleProp<TextStyle>;
	textStyles?: StyleProp<TextStyle>;
}

export default class DidiCard extends Component<DidiCardProps, {}> {
	private renderTitle() {
		return (
			<View style={styles.headerData}>
				<Text style={[styles.category, this.props.textStyles]}>{this.props.category}</Text>
				<Text style={[styles.title, this.props.textStyles]}>{this.props.title}</Text>
				<Text style={[styles.subTitle, this.props.textStyles]}>{this.props.subTitle}</Text>
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
			<Fragment>
				<View style={[styles.body, styles.card, this.props.cardStyles]}>
					<View style={styles.headerContainer}>
						{this.renderIcon()}
						<View
							style={{
								flexDirection: "column",
								flexGrow: 1,
								justifyContent: "space-between"
							}}
						>
							{this.renderTitle()}
							{this.props.children}
						</View>
					</View>
					<View style={styles.imageContainer}>
						<Image style={styles.image} source={this.props.image} />
					</View>
				</View>
			</Fragment>
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
	card: {
		marginBottom: 10
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
		marginRight: 25
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
