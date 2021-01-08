import React from "react";
import { Image, StyleSheet, View, ScrollView, Text } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
import { VERSION } from "../../../AppConfig";
const { paragraphs } = strings.settings.about;
const { Small } = DidiText.Explanation;

export type AboutThisAppScreenProps = {};
type AboutThisAppScreenState = {};
export type AboutThisAppScreenNavigation = {};

export class AboutThisAppScreen extends NavigationEnabledComponent<
	AboutThisAppScreenProps,
	AboutThisAppScreenState,
	AboutThisAppScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de ai·di");

	render() {
		return (
			<ScrollView>
				<View style={styles.view}>
					<View style={styles.imageContainer}>
						<Image style={styles.didiLogo} source={require("../../resources/images/logo.png")} />
					</View>
					{paragraphs.map((p, index) => (
						<Text style={styles.paragraph} key={index}>
							{p.map((item, subindex) => (
								<Small style={item.style} key={subindex}>
									{item.text}
								</Small>
							))}
						</Text>
					))}
					<Text style={styles.paragraph}>{`versión: ${VERSION}`}</Text>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		paddingHorizontal: 30,
		paddingBottom: 20
	},
	didiLogo: {
		width: "50%",
		height: 140,
		resizeMode: "contain"
	},
	paragraph: {
		textAlign: "justify",
		marginVertical: 8
	},
	imageContainer: {
		flex: 1,
		alignItems: "center",
		marginBottom: -10
	}
});
