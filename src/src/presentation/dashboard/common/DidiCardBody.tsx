import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, ViewProps } from "react-native";

export interface DidiCardBodyProps extends ViewProps {
	icon: string;
	image?: ImageSourcePropType;
	color: string;
	hollow?: boolean;
}

export default class DidiCardBody extends Component<DidiCardBodyProps> {
	render() {
		const bodyStyle = this.props.hollow
			? { borderColor: this.props.color, backgroundColor: "#FFF", borderWidth: 2 }
			: { backgroundColor: this.props.color };
		const iconStyle = this.props.hollow ? { color: this.props.color } : { color: "#FFF" };
		return (
			<View {...this.props} style={[styles.bodyDefaults, bodyStyle, this.props.style]}>
				<View style={styles.headerContainer}>
					<View style={styles.headerIconContainer}>
						<Text style={[styles.icon, iconStyle]}>{this.props.icon}</Text>
					</View>
					<View style={styles.textContainer}>{this.props.children}</View>
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
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "stretch"
	},
	bodyDefaults: {
		borderRadius: 10,
		flex: 0,
		minHeight: 180,
		marginVertical: 8
	},

	headerIconContainer: {
		justifyContent: "flex-start"
	},
	icon: {
		height: 30,
		width: 30,
		marginRight: 25,
		fontFamily: "MaterialIcons-Regular",
		fontSize: 30
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
