import { Component, Fragment } from "react";
import { Text, View, StyleSheet, StyleProp, TextStyle, FlatList } from "react-native";
import React from "react";

interface DidiCardProps {
	data: Array<{ label: string; value: string }>;
	columns: 1 | 2 | 3;
	textStyles?: StyleProp<TextStyle>;
}

export default class DidiCardData extends Component<DidiCardProps, {}> {
	private renderKeyValueHorizontal() {
		const { data, textStyles, columns } = this.props;
		return (
			<FlatList
				data={data}
				numColumns={columns}
				keyExtractor={item => item.label}
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

	private renderKeyValueVertical() {
		const { data, textStyles } = this.props;
		return (
			<FlatList
				data={data}
				keyExtractor={item => item.label}
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

	render() {
		return (
			<Fragment>
				<View>{this.props.columns === 1 ? this.renderKeyValueVertical() : this.renderKeyValueHorizontal()}</View>
			</Fragment>
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
