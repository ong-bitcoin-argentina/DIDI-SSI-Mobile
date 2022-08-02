import React, { Component } from "react";
import { DidiText } from "../util/DidiText";
import { StyleSheet, Text } from "react-native";
import Link from "../util/Link";
import strings from "../resources/strings";
import colors from "../resources/colors";
const { registerDetail, terms, policies } = strings.signup.registrationEmailSent;

type TermsProps = {
	style?: any;
};

type TermsState = {};

export default class TermsExplanation extends Component<TermsProps, TermsState> {
	render() {
		return (
			<Text style={[styles.terms, this.props.style]}>
				<DidiText.Explanation.Small style={styles.fontSize}>{registerDetail}</DidiText.Explanation.Small>
				<Link url="https://didi.org.ar/aidi/terminos-condiciones.html" style={styles.fontSize}>
					{terms}
				</Link>
				{` y `}
				<Link url="https://didi.org.ar/aidi/privacidad.html" style={styles.fontSize}>
					{policies}
				</Link>
			</Text>
		);
	}
}

const fontSize = 13;

const styles = StyleSheet.create({
	terms: {
		color: colors.text,
		textAlign: "left",
		fontSize
	},
	fontSize: {
		fontSize
	}
});
