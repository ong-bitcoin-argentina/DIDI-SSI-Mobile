import { Component, Fragment } from "react";
import { Text, View, StyleSheet, StyleProp, TextStyle, FlatList } from "react-native";
import React from "react";

interface DidiCardProps {
	data: { label: string; value: string; id: string }[];
	isHorizontal: boolean;
	textStyles?: StyleProp<TextStyle>;
}

export default class DidiCardData extends Component<DidiCardProps, {}> {
	private renderKeyValueHorizontal() {
		let data = this.props.data;
		let textStyles = this.props.textStyles;
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

	private renderKeyValueVerticel() {
		let data = this.props.data;
		let textStyles = this.props.textStyles;
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

	render() {
		return (
			<Fragment>
				<View>
					{this.props.isHorizontal && this.renderKeyValueHorizontal()}
					{!this.props.isHorizontal && this.renderKeyValueVerticel()}
				</View>
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
