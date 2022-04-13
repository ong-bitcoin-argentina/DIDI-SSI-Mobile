import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from "../../util/DidiText";
import { DashboardScreenProps } from "../home/Dashboard";

import strings from "../../resources/strings";
import colors from '../../resources/colors';

export interface IdentityScreenNavigation {
	DashboardHome: DashboardScreenProps;
	VuIdentityHow: {};
	
}

export class IdentityScreen extends NavigationEnabledComponent<{}, {}, IdentityScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		IdentityScreenNavigation,
		"DashboardHome"
	>(strings.tabNames.identity, "DashboardHome", {});


	navigationVuSecurity = ()=>{
		this.navigate("VuIdentityHow", {});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
				<DidiText.ValidateIdentity.Subtitle style={styles.header}>{"Validado por VU Security"}</DidiText.ValidateIdentity.Subtitle>
				<DidiText.ValidateIdentity.Title style={styles.title}>{strings.vuIdentity.what.header}</DidiText.ValidateIdentity.Title>
				<DidiText.ValidateIdentity.Normal>{strings.vuIdentity.what.description}</DidiText.ValidateIdentity.Normal>
				<Image style={styles.imageShows} source={require("../../resources/images/validateIdentityWhat.png")} />
					<TouchableOpacity 
							style={styles.titlebtn} 
							onPress={this.navigationVuSecurity}
							>
								<View style={styles.listIssuers}>
									<View style={styles.titlebtn}>
										<Image style={styles.image} source={require("../../resources/images/vu_icon_.png")} />
										<DidiText.Button disabled={false} style={styles.titleStyle}>{strings.vuIdentity.what.buttonText}</DidiText.Button>
									</View>
								</View>
					</TouchableOpacity>
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
		fontSize: 19,
	},
	header: {
		paddingVertical: 5,
		marginVertical:15,
		backgroundColor: colors.backgroundSeparator
	},
	titlebtn: {
		display: "flex",
		flexDirection: "row",
		justifyContent:"center",
		paddingVertical: "4%"
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
		borderWidth: 2,
		borderRadius: 10,
		width: "100%",
		borderColor: colors.border.light,
		backgroundColor: colors.primary,
	},
	titleStyle:{
		color:"white"
	},
	image: {
		width: 30,
		height: 30,
		marginRight: '5%'
	},
	imageShows:{
		alignSelf: "center",
		width: 136,
		height: 144,
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
