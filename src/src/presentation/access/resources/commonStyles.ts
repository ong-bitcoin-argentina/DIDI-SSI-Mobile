import { StyleSheet, TextStyle } from "react-native";

import colors from "../../resources/colors";

const baseTextStyle: TextStyle = {
	textAlign: "center",
	fontSize: 18,
	color: colors.text
};

export default {
	text: StyleSheet.create({
		normal: baseTextStyle,
		emphasis: {
			...baseTextStyle,
			fontWeight: "bold"
		},
		faded: {
			...baseTextStyle,
			color: colors.textFaded
		}
	}),
	image: StyleSheet.create({
		image: {
			width: 185,
			height: 160,
			alignSelf: "center"
		}
	}),
	view: StyleSheet.create({
		area: {
			backgroundColor: colors.background,
			flex: 1,
			alignItems: "center"
		},
		body: {
			width: "80%",
			alignItems: "stretch",
			justifyContent: "space-evenly",
			flex: 1
		}
	})
};
