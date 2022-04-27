import React from "react";
import { DidiScreen } from "./DidiScreen";
import NavigationHeaderStyle from "./NavigationHeaderStyle";
import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";
import { DidiText } from "../util/DidiText";
import { StyleSheet, Linking } from 'react-native';
import colors from "../resources/colors";
import strings from "../resources/strings";
const mailTo = "soporte@didi.org";
const mailBody = "Soporte ai.di";

export type OpenEmailScreenProps = {};
export type OpenEmailScreenNavigation = {};

export class OpenEmailScreen extends NavigationEnabledComponent<OpenEmailScreenProps,{},OpenEmailScreenNavigation> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Contáctanos");

	render() {		
		return(
			<DidiScreen style={{justifyContent:'flex-start', paddingVertical: 30}}>			
				<DidiText.Explanation.Normal>
					{strings.contact.title}
				</DidiText.Explanation.Normal>
				<DidiText.Explanation.Normal style={styles.marginTop30} >
					{strings.contact.description}
				</DidiText.Explanation.Normal>
				<DidiButton
						onPress={this.openMail}
						style={[styles.primaryButton, styles.marginTop80]} 
						title={strings.contact.action}
					/>
			</DidiScreen>
		)
	}

	private openMail = async() => {
		Linking.openURL(`mailto:${mailTo}?subject=SendMail&body=${mailBody}`); 
	}
}

const styles = StyleSheet.create({
	primaryButton: {
		backgroundColor: colors.primaryShadow
	},
	marginTop30: {
		marginTop: 30,
	},
	marginTop80: {
		marginTop: 80,
	}
});
