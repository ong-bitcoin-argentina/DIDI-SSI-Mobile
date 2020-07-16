import React, { Fragment } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import { AddChildren } from "../util/ReactExtensions";

import Background from "./resources/images/startAccessBackground.svg";
import themes from "./resources/themes";

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
						<Image style={styles.didiLogo} source={require("./resources/images/logo.png")} />
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
		flex: 1,
		flexDirection: "row"
	},
	buttonContainer: {
		width: "80%",
		alignItems: "stretch",
		flex: 1,
		justifyContent: "space-evenly",
		marginBottom: 10
	},
	didiLogo: {
		width: "52%",
		resizeMode: "contain"
	}
});
