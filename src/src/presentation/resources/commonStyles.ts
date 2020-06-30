import { StyleSheet } from "react-native";

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
			alignItems: "center",
		},
		body: {
			width: "80%",
			alignItems: "stretch",
			justifyContent: "space-evenly",
			flex: 1
		},
		scroll: {
			flexGrow: 1,
			justifyContent: "space-between",
			paddingHorizontal: "10%",
			paddingVertical: 30
		},
	}),
	benefit: StyleSheet.create({
		view: {
			flex: 1,
			padding: 20,
		},
		area: {
			backgroundColor: colors.background,
			flex: 1,
			alignItems: "center",
			paddingHorizontal: 20,
			paddingVertical: 10
		},
		header: {
			width: '100%',
			textAlign: 'left',
			marginVertical: 10
		},
		bottomButton: {
			paddingVertical: 20,
			height: 20
		}

	})
};
