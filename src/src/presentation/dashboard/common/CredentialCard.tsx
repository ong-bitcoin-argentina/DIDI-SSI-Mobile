import React, { Component } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import colors from "../../resources/colors";

import DidiCardBody, { DidiCardBodyProps } from "./DidiCardBody";

export interface CredentialCardProps extends DidiCardBodyProps {
	category: string;
	title: string;
	subTitle: string;
	data?: Array<{ label: string; value: string }>;
	columns?: 1 | 2 | 3;
}

export default class CredentialCard extends Component<CredentialCardProps, {}> {
	private renderTitle(textStyle: TextStyle) {
		return (
			<View style={styles.headerData}>
				<Text style={[styles.category, textStyle]}>{this.props.category}</Text>
				<Text style={[styles.title, textStyle]}>{this.props.title}</Text>
				<Text style={[styles.subTitle, textStyle]}>{this.props.subTitle}</Text>
			</View>
		);
	}

	private renderKeyValuePairs(textStyle: TextStyle) {
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
						<View key={index} style={columnStyle}>
							<Text style={[styles.dataLabel, textStyle]}>{item.label}</Text>
							<Text style={[styles.dataValue, textStyle, valueStyle]}>{item.value}</Text>
						</View>
					);
				})}
			</View>
		);
	}

	render() {
		const textStyle = this.props.hollow ? { color: colors.secondary } : { color: "#FFF" };
		return (
			<DidiCardBody {...this.props}>
				{this.renderTitle(textStyle)}
				{this.renderKeyValuePairs(textStyle)}
				{this.props.children}
			</DidiCardBody>
		);
	}
}

const styles = StyleSheet.create({
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
		flexGrow: 1,
		flexShrink: 1
	}
});
