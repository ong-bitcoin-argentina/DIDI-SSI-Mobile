import { CredentialDocument, EthrDID } from "didi-sdk";
import React from "react";
import { StyleSheet } from "react-native";

import { assertUnreachable } from "../../../util/assertUnreachable";
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
		specialCredentials: SpecialCredentialMap;
	};
}

type CredentialStyleType = "share" | "identity" | "obsolete" | "normal";

interface CredentialStyle {
	color: string;
	hollow: boolean;
}

const credentialStyles: Record<CredentialStyleType, CredentialStyle> = {
	normal: {
		color: colors.secondary,
		hollow: false
	},
	identity: {
		color: colors.secondary,
		hollow: true
	},
	obsolete: {
		color: colors.error,
		hollow: false
	},
	share: {
		color: colors.text,
		hollow: false
	}
};

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	private issuerText(did: EthrDID): string {
		const issuerData = this.props.context.knownIssuers[did.did()];
		const issuerName = issuerData
			? issuerData.name === null
				? "Emisor desconocido"
				: `Emisor: ${issuerData.name}`
			: "Cargando...";
		return this.props.preview ? issuerName : `${issuerName}\n${strings.credentialCard.emitter + did.keyAddress()}`;
	}

	render() {
		const doc = this.props.document;

		const issuerText = this.issuerText(CredentialDocument.displayedIssuer(doc));

		const category = doc.issuedAt ? strings.credentialCard.formatDate(new Date(doc.issuedAt * 1000)) : "Credencial";

		let title = doc.title;
		let data = this.props.preview
			? CredentialDocument.extractPreviewDataPairs(doc)
			: CredentialDocument.extractAllDataPairs(doc);
		const specialType = doc.specialFlag?.type;
		if (specialType) {
			const dictionary: { title: string; [name: string]: string | undefined } = strings.specialCredentials[specialType];
			title = dictionary.title;
			data = data.map(({ label, value }) => ({
				label: dictionary[label] ?? label,
				value
			}));
		}

		const styleType = this.styleType();
		const style = credentialStyles[styleType];

		return (
			<CredentialCard
				icon=""
				category={category}
				title={title}
				subTitle={issuerText}
				data={data}
				columns={this.props.preview ? CredentialDocument.numberOfColumns(doc) : 1}
				color={style.color}
				hollow={style.hollow}
			>
				{this.props.children}
				{this.renderTypeMessage(styleType)}
			</CredentialCard>
		);
	}

	private styleType(): CredentialStyleType {
		const doc = this.props.document;
		const specialType = doc.specialFlag?.type;
		const activeDid = this.props.context.activeDid;

		if (activeDid && activeDid.did && activeDid.did() !== doc.subject.did()) {
			return "share";
		} else if (specialType) {
			const special = this.props.context.specialCredentials[specialType];
			if (special === undefined) {
				return "identity";
			} else if (special.jwt !== this.props.document.jwt) {
				return "obsolete";
			} else {
				return "identity";
			}
		} else {
			return "normal";
		}
	}

	private renderTypeMessage(type: CredentialStyleType): JSX.Element | undefined {
		switch (type) {
			case "normal":
			case "identity":
				return undefined;
			case "obsolete":
				return (
					<DidiText.Card.Warning style={{ color: "#FFF", marginTop: 10 }}>
						{strings.credentialCard.replaced}
					</DidiText.Card.Warning>
				);
			case "share":
				return (
					<DidiText.Card.Warning style={{ color: "#FFF", marginTop: 10 }}>
						{strings.credentialCard.shared}
					</DidiText.Card.Warning>
				);
			default:
				assertUnreachable(type);
		}
	}
}
