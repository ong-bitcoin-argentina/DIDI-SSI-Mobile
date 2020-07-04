import React from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
const  { first, second, third } = strings.settings.about;
const texts = [ first, second, third ];

export type AboutThisAppScreenProps = {};
type AboutThisAppScreenState = {};
export type AboutThisAppScreenNavigation = {};

export class AboutThisAppScreen extends NavigationEnabledComponent<
	AboutThisAppScreenProps,
	AboutThisAppScreenState,
	AboutThisAppScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Didi");

	render() {
		return (
			<ScrollView>
				<View style={styles.view}>
					<View style={styles.imageContainer}>
						<Image style={styles.didiLogo} source={require("../../resources/images/didiLogo.png")} />
					</View>
					{
						texts.map(text => (
							<DidiText.Explanation.Small style={styles.paragraph}>
								{text}
							</DidiText.Explanation.Small>
						))
					}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	view: {
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	didiLogo: {
		width: "33%",
		resizeMode: "contain",
		marginBottom: -10
	},
	paragraph: {
		textAlign: 'justify',
		marginVertical: 8
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		marginBottom: -10
	}
})