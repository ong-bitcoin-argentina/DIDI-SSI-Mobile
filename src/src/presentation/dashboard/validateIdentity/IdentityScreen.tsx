import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from "../../util/DidiText";
import { DashboardScreenProps } from "../home/Dashboard";

import strings from "../../resources/strings";

export interface IdentityScreenNavigation {
	DashboardHome: DashboardScreenProps;
}
interface ItemsBtn {
	title: string,
	image:  ImageSourcePropType,
	navigation: ()=>any,
}
export default class IdentityScreen extends NavigationEnabledComponent<{}, {}, IdentityScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		IdentityScreenNavigation,
		"DashboardHome"
	>(strings.tabNames.identity, "DashboardHome", {});

	identityButtons: ItemsBtn[]  = [
		{
			title: "Semillas",
			image: require("../../resources/images/semilla.png"),
			navigation: ()=>{
				this.navigate("ValidateSemillasID", {});
			}
		},
		{
			title: "Renaper",
			image: require("../../resources/images/renaper.png"),
			navigation: ()=>{
				this.navigate("ValidateID", {});
			}
		},
		{
			title: "VU Security",
			image: require("../../resources/images/vu_icon_.png"),
			navigation: ()=>{
				console.log('colocar  -- > this.navigation');
			}
		}
	];

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					{this.identityButtons.map((identityBtn: ItemsBtn, key: number) => {
						return (
							<TouchableOpacity 
							style={styles.title} 
							key={key}
							onPress={()=>identityBtn.navigation()}
							>
								<View style={styles.listIssuers}>
									<View style={styles.title}>
										<Image style={styles.image} source={identityBtn.image} />
										<DidiText.Explanation.Emphasis>{identityBtn.title}</DidiText.Explanation.Emphasis>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 35
	},
	title: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingTop: 25,
		paddingBottom: 20
	},
	description: {
		flexDirection: "row",
		alignItems: "flex-start",
		fontSize: 14,
		paddingLeft: 15,
		paddingBottom: 15
	},
	buttons: {
		marginTop: 5,
		marginBottom: 5,
		flexDirection: "row"
	},
	button: {
		width: 110
	},
	buttonMargin: {
		marginRight: 50
	},
	listIssuers: {
		marginBottom: 7,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#24CDD2",
		width: "100%"
	},
	image: {
		width: 30,
		height: 30,
		marginRight: 30,
		marginLeft: 30
	},
	container: {
		flex: 1,
		justifyContent: "center"
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
});
