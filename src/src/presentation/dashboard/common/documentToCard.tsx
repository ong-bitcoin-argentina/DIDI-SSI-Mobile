import { CredentialDocument } from "didi-sdk";
import React from "react";

import { DidiText } from "../../util/DidiText";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import CredentialCard from "./CredentialCard";

interface DocumentCredentialCardProps {
	preview: boolean;
	document: CredentialDocument;
	context: {
		activeDid: ActiveDid;
		knownIssuers: IssuerRegistry;
		specialCredentials: SpecialCredentialMap | null;
	};
}

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	render() {
		const doc = this.props.document;

		const issuerData = this.props.context.knownIssuers[doc.issuer.did()];
		const issuerName = issuerData
			? issuerData.name === null
				? "Emisor desconocido"
				: `Emisor: ${issuerData.name}`
			: "Cargando...";
		const issuer = this.props.preview
			? issuerName
			: `${issuerName}\n${strings.credentialCard.emitter + doc.issuer.keyAddress()}`;

		const category = doc.issuedAt ? new Date(doc.issuedAt * 1000).toLocaleString() : "Credencial";
		let title = doc.title;
		let data = CredentialDocument.extractDataPairs(doc, this.props.preview ? doc.preview : undefined);
		let color = colors.secondary;
		let hollow = this.props.document.specialFlag !== undefined;
		let replacedByAnother = false;
		let shared = false;

		const specialType = doc.specialFlag?.type;

		const activeDid = this.props.context.activeDid;
		if (activeDid && activeDid.did && activeDid.did() !== doc.subject.did()) {
			color = colors.text;
			hollow = false;
			shared = true;
		} else if (specialType) {
			const dictionary: { title: string; [name: string]: string | undefined } = strings.specialCredentials[specialType];
			title = dictionary.title;
			data = data.map(({ label, value }) => ({
				label: dictionary[label] ?? label,
				value
			}));

			if (
				this.props.context.specialCredentials &&
				this.props.context.specialCredentials[specialType]?.jwt !== this.props.document.jwt
			) {
				color = colors.error;
				hollow = false;
				replacedByAnother = true;
			}
		}

		return (
			<CredentialCard
				icon=""
				category={category}
				title={title}
				subTitle={issuer}
				data={data}
				columns={this.props.preview ? CredentialDocument.numberOfColumns(doc) : 1}
				color={color}
				hollow={hollow}
			>
				{this.props.children}
				{shared && (
					<DidiText.Card.Warning style={{ color: "#FFF", marginTop: 10 }}>
						{strings.credentialCard.shared}
					</DidiText.Card.Warning>
				)}
				{replacedByAnother && (
					<DidiText.Card.Warning style={{ color: "#FFF", marginTop: 10 }}>
						{strings.credentialCard.replaced}
					</DidiText.Card.Warning>
				)}
			</CredentialCard>
		);
	}
}
