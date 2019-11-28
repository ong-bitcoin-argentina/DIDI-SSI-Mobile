import { StyleSheet, TextStyle } from "react-native";

import colors from "./colors";

export default {
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
