import { EthrDID, SelectiveDisclosureRequest } from "@proyecto-didi/app-sdk";
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
	activeDid: EthrDID;
}

export class RequestCard extends Component<RequestCardProps, {}> {
	render() {
		const did = SelectiveDisclosureRequest.displayedIssuer(this.props.request);

		const endDate = this.props.request.expireAt
			? strings.credentialRequestCard.formatEndDate(new Date(this.props.request.expireAt * 1000))
			: undefined;
		return (
			<DidiCardBody icon="" color={colors.secondary} hollow={true} {...this.props}>
				<View>
					<Text>
						<DidiText.Card.Key>{strings.credentialRequestCard.from}: </DidiText.Card.Key>
						<DidiText.Card.Value>{this.props.activeDid.keyAddress()}</DidiText.Card.Value>
					</Text>

					<Text style={{ marginVertical: 2 }}>
						<DidiText.Card.Key>{strings.credentialRequestCard.requesterID}: </DidiText.Card.Key>
						<DidiText.Card.Value>{did.keyAddress()}</DidiText.Card.Value>
					</Text>

					<DidiText.Card.Key>{strings.credentialRequestCard.requests + ": "}</DidiText.Card.Key>
					{Object.entries(this.props.request.verifiedClaims).map(([field], index) => {
						const title = strings.credentialRequestCard.formatField(field);
						return <DidiText.Card.Key key={index}>{`    - ${title}`}</DidiText.Card.Key>;
					})}
					{Object.entries(this.props.request.ownClaims).map(([field], index) => {
						const title = strings.credentialRequestCard.formatField(field);
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
