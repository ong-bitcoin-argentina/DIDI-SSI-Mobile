import { Text, View, StyleProp, TextStyle, StyleSheet } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import React from "react";

export default class CardDataBuilder {
	static createCardData(
		data: { label: string; value: string; id: string }[],
		textStyles: StyleProp<TextStyle>,
		isHorizontal: boolean
	) {
		return isHorizontal
			? CardDataBuilder.renderKeyValueHorizontal(data, textStyles)
			: CardDataBuilder.renderKeyValueVerticel(data, textStyles);
	}

	private static renderKeyValueHorizontal(
		data: { label: string; value: string; id: string }[],
		textStyles?: StyleProp<TextStyle>
	) {
		return (
			<FlatList
				data={data}
				numColumns={3}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return (
						<View style={styles.dataColumn}>
							<Text style={[styles.dataColLabel, textStyles]}>{item.label}</Text>
							<Text style={[styles.dataColValue, textStyles]}>{item.value}</Text>
						</View>
					);
				}}
			/>
		);
	}

	private static renderKeyValueVerticel(
		data: { label: string; value: string; id: string }[],
		textStyles?: StyleProp<TextStyle>
	) {
		return (
			<FlatList
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return (
						<View style={styles.dataRow}>
							<Text style={[styles.dataRowLabel, textStyles]}>{item.label}</Text>
							<Text style={[styles.dataRowValue, textStyles]}>{item.value}</Text>
						</View>
					);
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	dataColumn: {
		marginTop: 5,
		flex: 1,
		width: "33%"
	},
	dataRow: {
		flex: 1,
		justifyContent: "center",
		flexDirection: "row"
	},
	dataColLabel: {
		marginRight: 6,
		fontSize: 12
	},
	dataColValue: {
		marginRight: 6,
		fontWeight: "bold",
		fontSize: 13
	},
	dataRowLabel: {
		fontSize: 14,
		flex: 1
	},
	dataRowValue: {
		fontWeight: "100",
		fontSize: 14,
		marginLeft: 10
	}
});
