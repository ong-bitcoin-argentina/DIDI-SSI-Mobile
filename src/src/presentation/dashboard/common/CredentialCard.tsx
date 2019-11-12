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
	private renderTitle(color: string) {
		return (
			<View style={styles.headerData}>
				<Text style={[styles.category, { color }]}>{this.props.category}</Text>
				<Text style={[styles.title, { color }]}>{this.props.title}</Text>
				<Text style={[styles.subTitle, { color }, { color: `${color}${colors.subtitleAlpha}` }]}>
					{this.props.subTitle}
				</Text>
			</View>
		);
	}

	private renderKeyValuePairs(color: string) {
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
							<Text style={[styles.dataLabel, { color }]}>{item.label}</Text>
							<Text style={[styles.dataValue, { color }, valueStyle]}>{item.value}</Text>
						</View>
					);
				})}
			</View>
		);
	}

	render() {
		const color = this.props.hollow ? colors.secondary : "#FFFFFF";
		return (
			<DidiCardBody {...this.props}>
				{this.renderTitle(color)}
				{this.renderKeyValuePairs(color)}
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
