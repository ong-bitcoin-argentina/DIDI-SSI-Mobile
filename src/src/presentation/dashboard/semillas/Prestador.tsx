import React, { PureComponent } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { DidiText } from "../../util/DidiText";
import colors from "../../resources/colors";
import FastImage from "react-native-fast-image";
import semillasImagesSources from "./imagesSources";
import { PrestadorModel } from "../../../model/Prestador";

type PrestadorProps = {
	item: PrestadorModel;
	active: boolean;
	onPress: any;
	style?: ViewStyle;
	// image: any;
};

export default class Prestador extends PureComponent<PrestadorProps, {}> {
	render() {
		return (
			<SafeAreaView style={[styles.item, this.props.active && styles.highlight]}>
				<TouchableOpacity onPress={this.props.onPress} style={styles.inside}>
					<View>
						<FastImage
							style={styles.image}
							source={semillasImagesSources[this.props.item.category]}
							priority={FastImage.priority.low}
						/>
					</View>
					<View>
						<DidiText.Explanation.Small style={styles.title}>{this.props.item.name}</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.description}>
							{this.props.item.speciality}
						</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={styles.description}>{this.props.item.phone}</DidiText.Explanation.Small>
						<DidiText.Explanation.Small style={{ ...styles.description, ...styles.label }}>
							Beneficio: {this.props.item.benefit}
						</DidiText.Explanation.Small>
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 10,
		fontWeight: "bold",
		marginVertical: 2
	},
	description: {
		fontSize: 10,
		marginVertical: 2
	},
	label: {
		paddingVertical: 1,
		paddingHorizontal: 5,
		backgroundColor: colors.label.background,
		color: colors.label.text
	},
	item: {
		flex: 1,
		margin: 1,
		borderRadius: 8,
		paddingVertical: 4,
		borderColor: colors.border.light,
		borderWidth: 1,
		minHeight: 90
	},
	inside: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
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
