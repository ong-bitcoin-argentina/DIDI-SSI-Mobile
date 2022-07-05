import { ClaimDataPairs, DocumentLayout } from "@proyecto-didi/app-sdk";
import React, { Component, Fragment } from "react";
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import { DidiText } from "../../util/DidiText";

import colors from "../../resources/colors";
import strings from "../../resources/strings";

import DidiCardBody, { DidiCardBodyProps } from "./DidiCardBody";
import { CredentialStates } from "../../../model/Credential";
import { FlatList } from "react-navigation";

export interface CredentialCardProps extends DidiCardBodyProps {
	category: string;
	title: string;
	credentialState?: CredentialStates;
	subTitles: string[];
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
		const { preview, title, category, subTitles } = this.props;
		return (
			<View style={styles.headerData}>
				{(!this.hasLayout() || !preview) && (
					<DidiText.Card.Category style={{ color }}>{category}</DidiText.Card.Category>
				)}
				<DidiText.Card.Title style={{ color }}>{title}</DidiText.Card.Title>
				{subTitles.map((text, index) => (
					<DidiText.Card.Subtitle key={index} style={{ color: `${color}${colors.subtitleAlpha}` }}>
						{text}
					</DidiText.Card.Subtitle>
				))}
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
			<View key={i} style={styles.keyValueContainer}>
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


	private renderSpecialText(color: string) {	
		return ( 
		<View >
		<FlatList
		 data={this.props.data}
		 renderItem={item => this.renderItem(item.item,color)}
		 keyExtractor={(_, index) => index.toString()}
		/>
		</View>
		)
		
	}

    private renderItem(item : {label:string,value:string},color: string) {
        return (

		<View style={styles.dataLabelContainer}>		
				{item.label?
				<DidiText.Card.Value style={[styles.dataLabel, { color, textAlign: undefined }]}>
											{item.label}
				</DidiText.Card.Value>:null}
				{item.value? 
				<DidiText.Card.Key style={[styles.dataLabel, { color}]}>
				{item.value} 
				</DidiText.Card.Key>: null}
		</View>
		);
    }
	render() {
		const { hollow, color, layout, icon, preview, credentialState, subTitles } = this.props;
		const cardColor = hollow ? color : colors.lightBackground;
		const style = layout?.style == "dark" && preview ? colors.darkText : cardColor;
		const isRevoked = credentialState === CredentialStates.revoked;
		const haveBackgroundImage = preview && layout && !isRevoked;
				
		return (
			<DidiCardBody
				{...this.props}
				icon={this.hasLayout() ? "" : icon}
				backgroundUrl={haveBackgroundImage ? layout?.backgroundImage : undefined}
				specialText={subTitles[0].includes('Emisor: Coopsol')?this.renderSpecialText(style): null}
			>
				{this.renderTitle(style)}
				{subTitles[0].includes('Emisor: Coopsol')?null:this.renderKeyValuePairs(style)}
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
		marginVertical:2
	},
	dataLabelContainer: {
		marginVertical:5
	},
	dataValue: {
		flexGrow: 1,
		flexShrink: 1
	}
});
