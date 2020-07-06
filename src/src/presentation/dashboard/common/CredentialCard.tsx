import { ClaimDataPairs, DocumentLayout } from "didi-sdk";
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
	layout?: DocumentLayout;
	preview: boolean;
}

interface DataRow {
	data?: ClaimDataPairs;
	columns?: number;
}

export default class CredentialCard extends Component<CredentialCardProps, {}> {
	private renderTitle(color: string) {
		const { preview, title, category, subTitle } = this.props;
		return (
			<View style={styles.headerData}>
				{(!this.hasLayout() || !preview) && (
					<DidiText.Card.Category style={{ color }}>{category}</DidiText.Card.Category>
				)}
				<DidiText.Card.Title style={{ color }}>{title}</DidiText.Card.Title>
				<DidiText.Card.Subtitle style={{ color: `${color}${colors.subtitleAlpha}` }}>{subTitle}</DidiText.Card.Subtitle>
			</View>
		);
	}

	private hasLayout(): boolean {
		const { layout } = this.props;
		return !!layout && layout.rows.length > 0;
	}

	private splitDataIntoRows(): DataRow[] {
		const { data, columns, layout } = this.props;
		const credFields = [...(data || [])];

		if (this.hasLayout()) {
			return (
				layout?.rows.map(row => {
					return {
						...row,
						data: [...credFields.splice(0, row.columns)]
					};
				}) || []
			);
		}
		return [
			{
				data,
				columns
			}
		];
	}

	private getItem(label: string, color: string, valueStyle: TextStyle, effectiveValue: string) {
		const valueText = (
			<DidiText.Card.Value style={[styles.dataValue, { color }, valueStyle]}>{effectiveValue}</DidiText.Card.Value>
		);

		const layout = this.hasLayout();

		return (
			<Fragment>
				<DidiText.Card.Key style={[styles.dataLabel, { color }]}>
					{label} {layout && valueText}
				</DidiText.Card.Key>
				{!layout && valueText}
			</Fragment>
		);
	}

	private renderKeyValuePairs(color: string) {
		const rowData = this.splitDataIntoRows();

		const columnStyles: ViewStyle[] = rowData.map(row => ({
			flexDirection: row.columns === 1 ? "row" : "column",
			width: `${100 / (row.columns || 1)}%`
		}));
		const valueStyle: TextStyle[] = rowData.map(row =>
			row.columns === 1 ? { marginBottom: 0, textAlign: "right" } : { marginBottom: 5, textAlign: "left" }
		);

		return rowData.map((row, i) => (
			<View style={styles.keyValueContainer}>
				{row.data?.map((item, index) => {
					const effectiveValue = strings.credentialCard.formatValue(item.value);
					return (
						<View key={index} style={columnStyles[i]}>
							{row.data?.length === 1 && item.label.length === 0 ? (
								<DidiText.Card.Value style={[styles.dataLabel, { color, textAlign: undefined }]}>
									{effectiveValue}
								</DidiText.Card.Value>
							) : (
								this.getItem(item.label, color, valueStyle[i], effectiveValue)
							)}
						</View>
					);
				})}
			</View>
		));
	}

	render() {
		const { hollow, color, layout, icon, preview } = this.props;
		const cardColor = hollow ? color : colors.lightBackground;
		const style = layout?.style == "dark" && preview ? colors.darkText : cardColor;

		return (
			<DidiCardBody
				{...this.props}
				icon={this.hasLayout() ? "" : icon}
				backgroundUrl={preview ? layout?.backgroundImage : undefined}
			>
				{this.renderTitle(style)}
				{this.renderKeyValuePairs(style)}
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
