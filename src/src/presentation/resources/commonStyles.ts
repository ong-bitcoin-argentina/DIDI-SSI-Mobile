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
			marginBottom: 0
		},
		bottomButton: {
			paddingVertical: 20,
			height: 20
		}
	}),
	modal: StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			marginTop: 22
		},
		view: {
			margin: 20,
			backgroundColor: "white",
			borderRadius: 8,
			paddingVertical: 10,
			paddingHorizontal: 20,
			width: '90%',
			height: '70%',
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5
		},
		footer: {
			flex: 1,
			flexDirection: 'row',
			bottom: 10,
			position: 'absolute'
		},
		smallButton: {
			height: 40,
			paddingHorizontal: 20
		},
		text: {
			marginBottom: 15,
			textAlign: "center"
		}
	})
};
