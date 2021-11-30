import React, { Fragment, version } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, View, Modal } from 'react-native';

import { AddChildren } from "../util/ReactExtensions";

import Background from "./resources/images/startAccessBackground.svg";
import themes from "./resources/themes";
import { DidiText } from "./util/DidiText";
import colors from "./resources/colors";
import { VERSION } from "../AppConfig";
import WarningModalVersion from "./common/WarningModalVersion";
import { getAidiVersion } from "../services/internal/getVersion";


interface SplashContentState {
	modalVisible: boolean;
}

export class SplashContent extends React.Component<{}, SplashContentState, AddChildren<{}>> {

	constructor(props: any) {
		super(props);
		this.state = {
			modalVisible: false,
		}
	}



	async componentDidMount() {
		const aidiVersion = `${await getAidiVersion()}`;
		const modalVisible = aidiVersion.valueOf() !== VERSION.valueOf();
		this.setState(() => ({
			modalVisible: modalVisible,
		}));
	}


	render() {
		const { modalVisible } = this.state;
		const { children } = this.props;
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
					<View style={{ marginTop: 40 }}>
						{modalVisible ?
							<WarningModalVersion
								message={"Hay una nueva versión de ai·di! Por favor actualizá la app desde Playstore para evitar inconvenientes"}
								modalVisible={modalVisible}
							/> :
							null
						}
						<DidiText.Explanation.Small style={styles.version}>{VERSION}</DidiText.Explanation.Small>
					</View>
					<View style={styles.buttonContainer}>{children}</View>
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
	},
	version: {
		color: colors.primary,
		fontSize: 14
	}
});