import { ClaimDataPairs } from "didi-sdk";
import React, { Component, Fragment } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle, ImageBackground } from "react-native";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import strings from "../../resources/strings";

import DidiCardBody, { DidiCardBodyProps } from "./DidiCardBody";

export interface CredentialCardProps extends DidiCardBodyProps {
	category: string;
	title: string;
	subTitle: string;
	data?: ClaimDataPairs;
	columns?: 1 | 2 | 3;
}

export default class CredentialCard extends Component<CredentialCardProps, {}> {
	private renderTitle(color: string) {
		return (
			<View style={styles.headerData}>
				<DidiText.Card.Category style={{ color }}>{this.props.category}</DidiText.Card.Category>
				<DidiText.Card.Title style={{ color }}>{this.props.title}</DidiText.Card.Title>
				<DidiText.Card.Subtitle style={{ color: `${color}${colors.subtitleAlpha}` }}>
					{this.props.subTitle}
				</DidiText.Card.Subtitle>
			</View>
		);
	}

	private splitDataIntoRows() {
		const { data, columns } = this.props;
		const credFields = [...(data || [])];

		return [
			{
				data,
				columns
			}
		];
		// if layout
		const layout = {
			rows: [
				{
					columns: columns
				}
			]
		};

		return layout.rows.map(row => {
			return {
				...row,
				data: [...credFields.splice(0, row.columns)]
			};
		});
	}

	private renderKeyValuePairs(color: string) {
		const rowData = this.splitDataIntoRows();

		console.log("datax", JSON.stringify(rowData));

		// const layout = {
		// 	rows: [
		// 		{
		// 			columns: 3
		// 		},
		// 		{
		// 			columns: 1
		// 		}
		// 	],
		// 	backgroundImage: "http://localhost:3500/img/SancorSalud.png"
		// };

		const columnStyles: ViewStyle[] = rowData.map(row => ({
			flexDirection: row.columns === 1 ? "row" : "column",
			width: `${100 / row.columns}%`
		}));
		const valueStyle: TextStyle[] = rowData.map(row =>
			row.columns === 1 ? { marginBottom: 0, textAlign: "right" } : { marginBottom: 5, textAlign: "left" }
		);

		return rowData.map((row, i) => (
			<View style={styles.keyValueContainer}>
				{row.data.map((item, index) => {
					const effectiveValue = strings.credentialCard.formatValue(item.value);
					return (
						<View key={index} style={columnStyles[i]}>
							{row.data.length === 1 && item.label.length === 0 ? (
								<DidiText.Card.Value style={[styles.dataLabel, { color, textAlign: undefined }]}>
									{effectiveValue}
								</DidiText.Card.Value>
							) : (
								<Fragment>
									<DidiText.Card.Key style={[styles.dataLabel, { color }]}>{item.label}</DidiText.Card.Key>
									<DidiText.Card.Value style={[styles.dataValue, { color }, valueStyle[i]]}>
										{effectiveValue}
									</DidiText.Card.Value>
								</Fragment>
							)}
						</View>
					);
				})}
			</View>
		));
	}

	render() {
		const color = this.props.hollow ? this.props.color : "#FFFFFF";
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
	keyValueContainer: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	dataLabel: {
		paddingRight: 5
	},
	dataValue: {
		flexGrow: 1,
		flexShrink: 1
	}
});
