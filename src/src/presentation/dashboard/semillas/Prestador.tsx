import React, { Component } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import FastImage from "react-native-fast-image";
import semillasImagesSources from "./constants";
import { PrestadorModel } from "../../../model/Prestador";
const { Icon } = DidiText;
const { Small } = DidiText.Explanation;
import Collapsible from "react-native-collapsible";

type PrestadorProps = {
	item: PrestadorModel;
	active: boolean;
	onPress: any;
	style?: ViewStyle;
};

type PrestadorState = {};

export default class Prestador extends PureComponent<PrestadorProps, PrestadorState> {
	render() {
		const { item, active, onPress } = this.props;
		return (
			<SafeAreaView style={[styles.item, active && styles.highlight]}>
				<TouchableOpacity onPress={onPress} style={styles.touchable}>
					<View style={styles.container}>
						<View style={styles.imageContainer}>
							{item.providerCategoryDto && (
								<FastImage
									style={styles.image}
									source={semillasImagesSources[item.providerCategoryDto.name]}
									priority={FastImage.priority.low}
								/>
							)}
						</View>
						<View style={styles.textContainer}>
							<Small style={styles.title}>{item.name}</Small>
							{!!item.speciality && <Small style={styles.description}>{item.speciality}</Small>}
							{!!item.benefit && (
								<Text style={styles.benefitContainer}>
									<Small style={[styles.label, { fontWeight: "normal" }]}>Beneficio: </Small>
									<Small style={styles.label}>{item.benefit}%</Small>
								</Text>
							)}
						</View>
						<View>
							{!!item.description && (
								<Icon fontSize={20} color={colors.primary}>
									{active ? "unfold_less" : "unfold_more"}
								</Icon>
							)}
						</View>
					</View>
					{!!item.description && (
						<Collapsible collapsed={!active}>
							<View style={styles.collapsed}>{!!item.description && <Small>{item.description}</Small>}</View>
						</Collapsible>
					)}
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 19,
		fontWeight: "bold",
		textAlignVertical: "center",
		marginVertical: 2
	},
	benefitContainer: {
		textAlign: "center",
		marginVertical: 2
	},
	description: {
		marginVertical: 2,
		fontSize: 16
	},
	label: {
		marginTop: 2,
		fontSize: 16,
		paddingVertical: 1,
		paddingHorizontal: 6,
		borderRadius: 9,
		color: colors.greenSemillas,
		fontWeight: "bold",
		alignSelf: "center"
	},
	item: {
		flex: 1,
		margin: 1,
		borderRadius: 8,
		paddingVertical: 4,
		borderColor: colors.border.light,
		borderWidth: 1
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	touchable: {
		paddingHorizontal: 10,
		height: "100%"
	},
	textContainer: {
		flex: 4,
		height: "100%",
		justifyContent: "space-evenly"
	},
	highlight: {
		borderWidth: 3,
		borderColor: colors.primary,
		borderRadius: 10
	},
	image: {
		height: 90,
		resizeMode: "contain",
		minWidth: 70
	},
	imageContainer: {
		flex: 3,
		alignItems: "center"
	},
	collapsed: {
		paddingVertical: 10,
		marginTop: 10
	}
});
