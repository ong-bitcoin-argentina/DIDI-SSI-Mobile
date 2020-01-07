import React from "react";

import { DidiText } from "../../util/DidiText";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SampleDocument } from "../../../model/SampleDocument";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import CredentialCard from "./CredentialCard";

export function sampleDocumentToCard(document: SampleDocument, index: number) {
	return (
		<CredentialCard
			key={"didi" + index}
			icon={document.icon}
			category={document.category}
			title={document.title}
			subTitle={document.subtitle}
			data={document.data}
			columns={document.columns}
			color={colors.secondary}
		/>
	);
}

interface DocumentCredentialCardProps {
	preview: boolean;
	document: CredentialDocument;
	context: SpecialCredentialMap;
}

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	render() {
		const doc = this.props.document;

		const issuer = doc.issuer.keyAddress().slice(0, 20);
		const category = doc.issuedAt ? new Date(doc.issuedAt * 1000).toLocaleString() : "Credencial";
		let title = doc.title;
		let data = CredentialDocument.extractDataPairs(doc, this.props.preview ? doc.preview : undefined);
		let color = colors.secondary;
		let hollow = this.props.document.specialFlag !== undefined;
		let replacedByAnother = false;

		const specialType = doc.specialFlag?.type;
		if (specialType) {
			const dictionary: { title: string; [name: string]: string | undefined } = strings.specialCredentials[specialType];
			title = dictionary.title;
			data = data.map(({ label, value }) => ({
				label: dictionary[label] ?? label,
				value
			}));

			if (this.props.context[specialType]?.jwt !== this.props.document.jwt) {
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
				subTitle={strings.credentialCard.emitter + issuer + "..."}
				data={data}
				columns={this.props.preview ? CredentialDocument.numberOfColumns(doc) : 1}
				color={color}
				hollow={hollow}
			>
				{this.props.children}
				{replacedByAnother && (
					<DidiText.Card.Warning style={{ color: "#FFF", marginTop: 10 }}>
						{strings.credentialCard.replaced}
					</DidiText.Card.Warning>
				)}
			</CredentialCard>
		);
	}
}
