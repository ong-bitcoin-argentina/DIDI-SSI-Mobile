import React, { Component } from "react";
import { Text, View, ViewProps } from "react-native";

import { DidiText } from "../../util/DidiText";

import { RequestDocument } from "../../../model/RequestDocument";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import DidiCardBody from "./DidiCardBody";

export interface RequestCardProps extends ViewProps {
	request: RequestDocument;
}

export class RequestCard extends Component<RequestCardProps, {}> {
	render() {
		const issuer = this.props.request.content.issuer.keyAddress().slice(0, 20);
		const endDate =
			this.props.request.content.expireAt && new Date(this.props.request.content.expireAt * 1000).toLocaleString();
		return (
			<DidiCardBody icon="" color={colors.secondary} hollow={true} {...this.props}>
				<View>
					<Text>
						<DidiText.Card.Key>{strings.credentialRequestCard.from + ": "}</DidiText.Card.Key>
						<DidiText.Card.Value>{issuer}</DidiText.Card.Value>
					</Text>
					<DidiText.Card.Key>{strings.credentialRequestCard.requests + ": "}</DidiText.Card.Key>
					{this.props.request.content.verifiedClaims.map((rq, index) => {
						return <DidiText.Card.Value key={index}>{`    - ${rq}`}</DidiText.Card.Value>;
					})}
					{endDate && (
						<Text>
							<DidiText.Card.Key>{strings.credentialRequestCard.before + ": "}</DidiText.Card.Key>
							<DidiText.Card.Value>{endDate}</DidiText.Card.Value>
						</Text>
					)}
				</View>
				{this.props.children}
			</DidiCardBody>
		);
	}
}
