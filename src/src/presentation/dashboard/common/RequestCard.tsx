import React, { Component } from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";

import DidiCardBody from "./DidiCardBody";
import { RequestDocument } from "../../../model/data/RequestDocument";
import colors from "../../resources/colors";

export interface RequestCardProps extends ViewProps {
	request: RequestDocument;
}

export class RequestCard extends Component<RequestCardProps, {}> {
	render() {
		const issuer = this.props.request.content.issuer.replace("did:ethr:0x", "").slice(0, 20);
		return (
			<DidiCardBody icon="" color={colors.secondary} hollow={true} {...this.props}>
				<View>
					<Text style={styles.normal}>
						{"De: "}
						<Text style={styles.em}>{issuer}</Text>
					</Text>
					<Text style={styles.normal}>Solicita: </Text>
					{this.props.request.content.verifiedClaims.map((rq, index) => {
						return <Text style={styles.em} key={index}>{`    - ${rq}`}</Text>;
					})}
				</View>
				{this.props.children}
			</DidiCardBody>
		);
	}
}

const styles = StyleSheet.create({
	normal: {
		color: colors.secondary
	},
	em: {
		color: colors.secondary,
		fontWeight: "bold"
	}
});
