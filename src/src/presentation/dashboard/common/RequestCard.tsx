import React, { Component } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

import { RequestDocument } from "../../../model/RequestDocument";
import colors from "../../resources/colors";

import DidiCardBody from "./DidiCardBody";

export interface RequestCardProps extends ViewProps {
	request: RequestDocument;
}

export class RequestCard extends Component<RequestCardProps, {}> {
	render() {
		const issuer = this.props.request.content.issuer.replace("did:ethr:0x", "").slice(0, 20);
		const endDate =
			this.props.request.content.expireAt && new Date(this.props.request.content.expireAt * 1000).toLocaleString();
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
					{endDate && (
						<Text style={styles.normal}>
							{"Antes de: "}
							<Text style={styles.em}>{endDate}</Text>
						</Text>
					)}
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
