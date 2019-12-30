import React from "react";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { SampleDocument } from "../../../model/SampleDocument";
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
}

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	render() {
		const doc = this.props.document;
		const issuer = doc.issuer.keyAddress().slice(0, 20);
		const category = doc.issuedAt ? new Date(doc.issuedAt * 1000).toLocaleString() : "Credencial";
		return (
			<CredentialCard
				icon=""
				category={category}
				title={doc.title}
				subTitle={strings.credentialCard.emitter + issuer + "..."}
				data={CredentialDocument.extractDataPairs(doc, this.props.preview ? doc.preview : undefined)}
				columns={this.props.preview ? CredentialDocument.numberOfColumns(doc) : 1}
				color={colors.secondary}
				hollow={this.props.document.specialFlag !== undefined}
			/>
		);
	}
}
