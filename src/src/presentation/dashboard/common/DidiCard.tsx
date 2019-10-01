import { Component, Fragment } from "react";
import {
	Text,
	View,
	Image,
	StyleSheet,
	ImageSourcePropType,
	StyleProp,
	TextStyle,
	ViewProps,
	ViewStyle
} from "react-native";
import React from "react";

export interface DidiCardProps extends ViewProps {
	icon: string;
	image?: ImageSourcePropType;
	category: string;
	title: string;
	subTitle: string;
	data?: Array<{ label: string; value: string }>;
	columns?: 1 | 2 | 3;
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
				<Text style={[styles.icon, this.props.textStyle]}>{this.props.icon}</Text>
			</View>
		);
	}

	private renderKeyValuePairs() {
		const { textStyle } = this.props;
		const columns = this.props.columns || 1;
		const data = this.props.data || [];

		const columnStyle: ViewStyle = {
			flexDirection: columns === 1 ? "row" : "column",
			width: `${100 / columns}%`
		};
		const valueStyle: TextStyle =
			columns === 1 ? { marginBottom: 0, textAlign: "right" } : { marginBottom: 5, textAlign: "left" };
		return (
			<View style={styles.keyValueContainer}>
				{data.map((item, index) => {
					return (
						<View key={index} style={[columnStyle]}>
							<Text style={[styles.dataLabel, textStyle]}>{item.label}</Text>
							<Text style={[styles.dataValue, textStyle, valueStyle]}>{item.value}</Text>
						</View>
					);
				})}
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
						{this.renderKeyValuePairs()}
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
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "stretch"
	},
	card: {
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
		width: 30,
		marginRight: 25,
		fontFamily: "MaterialIcons-Regular",
		fontSize: 30
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
	},
	keyValueContainer: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	dataLabel: {
		fontSize: 13,
		paddingRight: 5
	},
	dataValue: {
		fontWeight: "bold",
		fontSize: 13,
		flexGrow: 1
	}
});
