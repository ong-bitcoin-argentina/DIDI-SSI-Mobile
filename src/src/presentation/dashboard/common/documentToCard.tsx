import React from "react";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SampleDocument } from "../../../model/SampleDocument";
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
	document: CredentialDocument;
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
				data={this.props.preview ? doc.content.claims.previewPairs() : doc.content.claims.allPairs()}
				columns={this.props.preview ? doc.content.claims.numberOfColumns() : 1}
				color={colors.secondary}
			/>
		);
	}
}
