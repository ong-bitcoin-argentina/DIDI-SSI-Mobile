import { Component, Fragment } from "react";
import { Text, View, Image, StyleSheet, ImageSourcePropType, StyleProp, TextStyle } from "react-native";
import React from "react";

interface DidiCardProps {
	icon: ImageSourcePropType;
	image: ImageSourcePropType;
	category: string;
	title: string;
	timing: string;
	cardStyles?: StyleProp<TextStyle>;
	data: { label: number; value: string }[];
}

export default class DidiCard extends Component<DidiCardProps, {}> {
	render() {
		return (
			<Fragment>
				<View style={[styles.body, this.props.cardStyles]}>
					<View style={styles.headerContainer}>
						<View style={styles.header}>
							<View style={styles.headerIconContainer}>
								<Image style={styles.icon} source={this.props.icon} />
							</View>
							<View style={styles.headerData}>
								<Text style={styles.category}>{this.props.category}</Text>
								<Text style={styles.title}>{this.props.title}</Text>
								<Text style={styles.timing}>{this.props.timing}</Text>
							</View>
						</View>
						<View style={styles.imageContainer}>
							<Image style={styles.image} source={this.props.image} />
						</View>
					</View>
					<View style={styles.data}>
						{this.props.data.map(elem => {
							return (
								<View key={elem.label + "-label"} style={styles.dataRow}>
									<Text key={elem.label + "-label"} style={styles.dataRowLabel}>
										{elem.label}
									</Text>
									<Text key={elem.label + "-value"} style={styles.dataRowValue}>
										{elem.value}
									</Text>
								</View>
							);
						})}
					</View>
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row"
	},
	data: {
		justifyContent: "center",
		margin: 10
	},
	dataRow: {
		justifyContent: "center",
		flexDirection: "row"
	},
	dataRowLabel: {
		fontWeight: "100",
		fontSize: 14,
		color: "#FFF",
		flex: 1
	},
	dataRowValue: {
		fontWeight: "100",
		fontSize: 14,
		color: "#FFF",
		marginLeft: 10,
		marginRight: 10
	},
	body: {
		borderRadius: 10,
		flexDirection: "column"
	},
	header: {
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "flex-start",
		flex: 1
	},
	headerIconContainer: {
		justifyContent: "center"
	},
	invIcon: {
		margin: 10
	},
	icon: {
		margin: 10
	},
	headerData: {
		marginLeft: 20,
		textAlign: "left",
		justifyContent: "center"
	},
	category: {
		fontWeight: "100",
		fontSize: 12,
		color: "#FFF"
	},
	title: {
		fontWeight: "500",
		fontSize: 16,
		color: "#FFF"
	},
	timing: {
		fontSize: 12,
		color: "#FFF"
	},

	imageContainer: {
		justifyContent: "flex-end"
	},
	image: {
		margin: 10
	}
});
