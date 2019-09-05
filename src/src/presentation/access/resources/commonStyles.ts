import { StyleSheet, TextStyle } from "react-native";
import colors from "../../styles/colors";

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
