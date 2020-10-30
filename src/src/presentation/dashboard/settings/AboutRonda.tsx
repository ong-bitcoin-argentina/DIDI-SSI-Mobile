import React from "react";
import { Image, StyleSheet, View, ScrollView, Text } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import RondaLogo from "../../resources/images/ronda-horizontal.svg";

import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
const { aboutRondaParagraphs } = strings.settings;
const { Small } = DidiText.Explanation;

export type AboutRondaScreenProps = {};
type AboutRondaScreenState = {};
export type AboutRondaScreenNavigation = {};

export class AboutRondaScreen extends NavigationEnabledComponent<
	AboutRondaScreenProps,
	AboutRondaScreenState,
	AboutRondaScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Ronda");

	render() {
		return (
			<ScrollView>
				<View style={styles.view}>
					<View style={styles.imageContainer}>
						<RondaLogo />
					</View>
					{aboutRondaParagraphs.map((p, index) => (
						<Text style={styles.paragraph} key={index}>
							{p.map((item, subindex) => (
								<Small style={item.style} key={subindex}>
									{item.text}
								</Small>
							))}
						</Text>
					))}
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
		marginTop: 40,
		marginBottom: 32
	}
});
