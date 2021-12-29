import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiText } from '../../util/DidiText';
import { DashboardScreenProps } from '../home/Dashboard';

import strings from "../../resources/strings";

export interface IdentityScreenNavigation {
    DashboardHome: DashboardScreenProps;
}


export default class IdentityScreen extends NavigationEnabledComponent<{}, {}, IdentityScreenNavigation> {
    static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<IdentityScreenNavigation, "DashboardHome">(
        strings.tabNames.identity,
        "DashboardHome",
        {}
    );
    
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.body}>
					<TouchableOpacity style={styles.title}>
						<View style={styles.listIssuers}>
							<View style={styles.title}>
								<Image style={styles.image} source={require("../../resources/images/semilla.png")} />
								<DidiText.Explanation.Emphasis>Semillas</DidiText.Explanation.Emphasis>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.title}>
						<View style={styles.listIssuers}>
							<View style={styles.title}>
								<Image style={styles.image} source={require("../../resources/images/renaper.png")} />
								<DidiText.Explanation.Emphasis>Renaper</DidiText.Explanation.Emphasis>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.title}>
						<View style={styles.listIssuers}>
							<View style={styles.title}>
								<Image style={styles.image} source={require("../../resources/images/vu_icon_.png")} />
								<DidiText.Explanation.Emphasis>VU Security</DidiText.Explanation.Emphasis>
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
        width: "100%",
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
