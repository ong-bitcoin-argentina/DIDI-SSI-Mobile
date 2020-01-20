import { ClaimDataPairs } from "didi-sdk";
import React, { Component, Fragment } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

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
							{data.length !== 1 && item.label.length > 0 ? (
								<Fragment>
									<DidiText.Card.Key style={[styles.dataLabel, { color }]}>{item.label}</DidiText.Card.Key>
									<DidiText.Card.Value style={[styles.dataValue, { color }, valueStyle]}>
										{item.value ?? strings.credentialCard.valueNotAvailable}
									</DidiText.Card.Value>
								</Fragment>
							) : (
								<DidiText.Card.Value style={[styles.dataLabel, { color, textAlign: undefined }]}>
									{item.value ?? strings.credentialCard.valueNotAvailable}
								</DidiText.Card.Value>
							)}
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
