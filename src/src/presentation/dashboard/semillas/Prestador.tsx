import React, { PureComponent } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewStyle, Text } from "react-native";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import FastImage from "react-native-fast-image";
import semillasImagesSources from "./constants";
import { PrestadorModel } from "../../../model/Prestador";
const { Small } = DidiText.Explanation;

type PrestadorProps = {
	item: PrestadorModel;
	active: boolean;
	onPress: any;
	style?: ViewStyle;
};

export default class Prestador extends PureComponent<PrestadorProps, {}> {
	render() {
		const { item, active, onPress } = this.props;
		return (
			<SafeAreaView style={[styles.item, active && styles.highlight]}>
				<TouchableOpacity onPress={onPress} style={styles.container}>
					<View style={{ flex: 3, alignItems: "center" }}>
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
						{item.speciality && <Small style={styles.description}>{item.speciality}</Small>}
						<Text style={{ textAlign: "center" }}>
							<Small style={[styles.label, { fontWeight: "normal" }]}>Beneficio: </Small>
							<Small style={styles.label}>{item.benefit}%</Small>
						</Text>
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 19,
		fontWeight: "bold",
		textAlignVertical: "center"
	},
	description: {
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
		borderWidth: 1,
		minHeight: 105
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingHorizontal: 10
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
		height: "100%",
		resizeMode: "cover",
		width: 70
	},
	imageContainer: {
		textAlign: "center"
	}
});
