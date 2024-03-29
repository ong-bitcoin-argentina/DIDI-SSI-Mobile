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
			alignItems: "center"
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
		scrollCentered: {
			paddingHorizontal: 20,
			flexGrow: 1,
			justifyContent: "center",
			alignItems: "center"
		}
	}),
	benefit: StyleSheet.create({
		view: {
			flex: 1,
			padding: 20
		},
		area: {
			backgroundColor: colors.background,
			flex: 1,
			alignItems: "center",
			paddingHorizontal: 20,
			paddingVertical: 10
		},
		header: {
			width: "100%",
			textAlign: "center",
			marginBottom: 8,
			fontSize: 19
		}
	}),
	modal: StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			backgroundColor: colors.shadow
		},
		view: {
			backgroundColor: "white",
			borderRadius: 8,
			paddingVertical: 20,
			paddingHorizontal: 20,
			width: "90%",
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 10
		},
		title: {
			fontSize: 19,
			fontWeight: "bold",
			textAlign: "left",
			alignSelf: "flex-start"
		},
		subtitle: {
			fontSize: 16,
			fontWeight: "bold",
			textAlign: "left",
			alignSelf: "flex-start"
		},
		footer: {
			width: "100%",
			flexDirection: "row",
			justifyContent: "space-around",
			marginTop: 10
		},
		smallButton: {
			height: 40,
			paddingHorizontal: 20
		},
		text: {
			marginBottom: 15,
			textAlign: "center"
		}
	}),
	button: StyleSheet.create({
		lightRed: {
			height: 36,
			backgroundColor: colors.error,
			paddingHorizontal: 20
		},
		lightGreen: {
			height: 36,
			backgroundColor: colors.greenSemillas,
			paddingHorizontal: 20
		},
		inverted: {
			backgroundColor: colors.white,
			borderColor: colors.primaryLight,
			borderWidth: 1
		}
	}),
	util: StyleSheet.create({
		paragraphSm: {
			marginVertical: 7,
			fontSize: 14
		},
		paragraphMd: {
			marginVertical: 11,
			fontSize: 18
		},
		shadow: {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 14
		},
		credentialCard: {
			marginVertical: 4,
			marginHorizontal: 4,
			paddingHorizontal: 10,
			paddingVertical: 8
		}
	}),
	consentScreen:StyleSheet.create({
		scroll: {
			width: "100%",
			paddingHorizontal: '2%'		
		},
		titles: {
			fontSize: 15,
			fontFamily: "Roboto-Regular",
			fontWeight: "bold",
			color: colors.darkBlue, 
		},
		titlesInner: {
			fontFamily: "Roboto-Regular",
			fontSize: 14,
			color: colors.text, 
		},
		text: {
			fontSize: 12,
			fontFamily: "Roboto-Regular",
			fontWeight: "100",
			color: colors.text, 
		},
		titlesCard:{	
			paddingVertical:10,        
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		border: {
			borderBottomWidth:1,
			borderBottomColor: '#4A4A4A',
		}
		
	})
};
