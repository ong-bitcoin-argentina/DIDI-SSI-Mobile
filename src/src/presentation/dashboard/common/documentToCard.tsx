import React from "react";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SampleDocument } from "../../../model/SampleDocument";
import { SpecialCredentialData } from "../../../store/selector/credentialSelector";
import colors from "../../resources/colors";

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
	document: CredentialDocument | SpecialCredentialData;
}

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	render() {
		const doc = this.props.document;
		const issuer = doc.content.issuer.keyAddress().slice(0, 20);
		const category = doc.content.issuedAt ? new Date(doc.content.issuedAt * 1000).toLocaleString() : "Credencial";
		return (
			<CredentialCard
				icon=""
				category={category}
				title={doc.content.claims.title}
				subTitle={"Emisor: " + issuer + "..."}
				data={CredentialDocument.extractDataPairs(doc, this.props.preview ? doc.content.claims.preview : undefined)}
				columns={this.props.preview ? doc.content.claims.numberOfColumns() : 1}
				color={colors.secondary}
				hollow={this.props.document.specialFlag !== undefined}
			/>
		);
	}
}
