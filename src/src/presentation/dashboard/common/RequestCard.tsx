import { EthrDID, SelectiveDisclosureRequest } from "didi-sdk";
import React, { Component } from "react";
import { Text, View, ViewProps } from "react-native";

import { DidiText } from "../../util/DidiText";

import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import DidiCardBody from "./DidiCardBody";

export interface RequestCardProps extends ViewProps {
	request: SelectiveDisclosureRequest;
	context: {
		knownIssuers: IssuerRegistry;
	};
}

export class RequestCard extends Component<RequestCardProps, {}> {
	private issuerName(did: EthrDID): string {
		const issuerData = this.props.context.knownIssuers[did.did()];
		return issuerData
			? issuerData.name === null
				? strings.credentialRequestCard.unknown
				: issuerData.name
			: "Cargando...";
	}

	render() {
		const did = SelectiveDisclosureRequest.displayedIssuer(this.props.request);
		const issuerName = this.issuerName(did);
		const endDate = this.props.request.expireAt && new Date(this.props.request.expireAt * 1000).toLocaleString();
		return (
			<DidiCardBody icon="" color={colors.secondary} hollow={true} {...this.props}>
				<View>
					<Text>
						<DidiText.Card.Key>{strings.credentialRequestCard.from}: </DidiText.Card.Key>
						<DidiText.Card.Value>{issuerName}</DidiText.Card.Value>
					</Text>

					<Text style={{ marginVertical: 2 }}>
						<DidiText.Card.Key>{strings.credentialRequestCard.requesterID}: </DidiText.Card.Key>
						<DidiText.Card.Value>{did.keyAddress()}</DidiText.Card.Value>
					</Text>

					<DidiText.Card.Key>{strings.credentialRequestCard.requests + ": "}</DidiText.Card.Key>
					{Object.entries(this.props.request.verifiedClaims).map(([title, rq], index) => {
						return <DidiText.Card.Key key={index}>{`    - ${title}`}</DidiText.Card.Key>;
					})}
					{Object.entries(this.props.request.ownClaims).map(([title, rq], index) => {
						return <DidiText.Card.Key key={index}>{`    - ${title}`}</DidiText.Card.Key>;
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
