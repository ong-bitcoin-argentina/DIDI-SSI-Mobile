import { View, SafeAreaView, StatusBar, Image, StyleSheet } from "react-native";
import React, { Fragment } from "react";

import themes from "./resources/themes";
import commonStyles from "./access/resources/commonStyles";
import NavigationEnabledComponent from "./util/NavigationEnabledComponent";
import NavigationHeaderStyle from "./resources/NavigationHeaderStyle";
import { StartAccessProps } from "./access/StartAccess";
import { DashboardScreenProps } from "./dashboard/home/Dashboard";
import { AddChildren } from "../util/ReactExtensions";

import Background from "./access/resources/images/startAccessBackground.svg";
import { RNUportHDSigner } from "react-native-uport-signer";

export interface SplashScreenNavigation {
	Access: StartAccessProps;
	Dashboard: DashboardScreenProps;
}

export class SplashScreen extends NavigationEnabledComponent<{}, {}, SplashScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.gone;

	componentDidMount() {
		RNUportHDSigner.hasSeed().then(hasSeed => {
			if (hasSeed) {
				this.navigate("Dashboard", {});
			} else {
				this.navigate("Access", {});
			}
		});
	}

	render() {
		return <SplashContent />;
	}
}

export class SplashContent extends React.Component<AddChildren<{}>> {
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<View style={StyleSheet.absoluteFill}>
					<Background width="100%" height="100%" preserveAspectRatio="xMidYMax slice" />
				</View>
				<SafeAreaView style={styles.area}>
					<View style={styles.imageContainer}>
						<Image style={styles.didiLogo} source={require("./resources/images/didiLogo.png")} />
					</View>
					<View style={styles.buttonContainer}>{this.props.children}</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	area: {
		flex: 1,
		alignItems: "center"
	},
	imageContainer: {
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1,
		flexDirection: "row",
		marginTop: 10
	},
	buttonContainer: {
		width: "80%",
		alignItems: "stretch",
		flex: 1,
		justifyContent: "space-evenly",
		marginBottom: 10
	},
	didiLogo: {
		width: "33%",
		resizeMode: "contain",
		alignSelf: "flex-end"
	}
});
