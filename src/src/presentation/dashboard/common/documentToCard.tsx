import { CredentialDocument, EthrDID } from "didi-sdk";
import React from "react";
import { StyleSheet } from "react-native";

import { assertUnreachable } from "../../../util/assertUnreachable";
import { DidiText } from "../../util/DidiText";

import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { StoreContent } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

import CredentialCard from "./CredentialCard";
import { CredentialStates } from "../../../model/Credential";
import { getBlockchain } from "../../../util/utilHelpers";

export interface DocumentCredentialCardContext {
	activeDid: ActiveDid;
	lastTokenSync: string[] | null;
	knownIssuers: IssuerRegistry;
	specialCredentials: SpecialCredentialMap;
}

export function extractContext(storeState: StoreContent): DocumentCredentialCardContext {
	return {
		activeDid: storeState.did.activeDid,
		knownIssuers: storeState.knownIssuers,
		lastTokenSync: storeState.tokensInLastSync,
		specialCredentials: storeState.activeSpecialCredentials
	};
}

export type CredentialState = "share" | "identity" | "revoked" | "obsolete" | "normal";

export function credentialState(
	document: CredentialDocument,
	context: DocumentCredentialCardContext
): CredentialStates {
	const specialType = document.specialFlag?.type;
	const activeDid = context.activeDid;
	const lastSync = context.lastTokenSync;

	if (activeDid && activeDid.did && activeDid.did() !== document.subject.did()) {
		return CredentialStates.share;
	} else if (specialType) {
		const special = context.specialCredentials[specialType];
		if (special === undefined) {
			return CredentialStates.identity;
		} else if (special.jwt !== document.jwt) {
			return CredentialStates.obsolete;
		} else {
			return CredentialStates.identity;
		}
	} else if (lastSync && !lastSync.includes(document.jwt)) {
		return CredentialStates.revoked;
	} else {
		return CredentialStates.normal;
	}
}

interface DocumentCredentialCardProps {
	style?: any;
	preview: boolean;
	document: CredentialDocument;
	context: DocumentCredentialCardContext;
}

interface CredentialStyle {
	color: string;
	hollow: boolean;
}

const credentialStyles: Record<CredentialState, CredentialStyle> = {
	normal: {
		color: colors.secondary,
		hollow: false
	},
	identity: {
		color: colors.secondary,
		hollow: true
	},
	revoked: {
		color: colors.backgroundSeparator,
		hollow: false
	},
	obsolete: {
		color: colors.backgroundSeparator,
		hollow: false
	},
	share: {
		color: colors.text,
		hollow: false
	}
};

const { credentialCard } = strings;
const { emitter } = credentialCard;

export class DocumentCredentialCard extends React.Component<DocumentCredentialCardProps> {
	private issuerText(did: EthrDID): string[] {
		const { document, context, preview } = this.props;
		const issuerData = context.knownIssuers[did.did()];
		const issuerName = issuerData
			? issuerData.name === null
				? emitter.unknown
				: emitter.known(issuerData.name)
			: emitter.loading;
		const emmitterId = `${emitter.id}: ${did.keyAddress()}`;
		const verificationBlockchain = `${credentialCard.verificationBlockchain}: ${getBlockchain(document.issuer)}`;
		return preview ? [issuerName] : [issuerName, emmitterId, verificationBlockchain];
	}

	render() {
		const { document, context, preview, children } = this.props;

		const issuerTexts = this.issuerText(CredentialDocument.displayedIssuer(document));

		const category = document.issuedAt ? credentialCard.formatDate(new Date(document.issuedAt * 1000)) : "Credencial";

		let title = document.title;
		let data = preview
			? CredentialDocument.extractPreviewDataPairs(document)
			: CredentialDocument.extractAllDataPairs(document);
		const specialType = document.specialFlag?.type;
		if (specialType) {
			const special = context.specialCredentials[specialType];
			//If it's a obsolete card then exclude from list
			if (special?.jwt !== document.jwt) {
				return null;
			}
			const dictionary: { title: string; [name: string]: string | undefined } = strings.specialCredentials[specialType];
			title = dictionary.title;
			data = data.map(({ label, value }) => ({
				label: dictionary[label] ?? label,
				value
			}));
		}

		const styleType = credentialState(document, context);
		const style = credentialStyles[styleType];

		return (
			<CredentialCard
				icon=""
				layout={document.preview?.cardLayout}
				category={category}
				title={title}
				subTitles={issuerTexts}
				data={data}
				columns={preview ? CredentialDocument.numberOfColumns(document) : 1}
				secondChildren={document.preview?.cardLayout && this.renderTypeMessage(styleType)}
				color={style.color}
				hollow={style.hollow}
				preview={preview}
				credentialState={styleType}
				style={this.props.style}
			>
				{children}
				{!document.preview?.cardLayout && this.renderTypeMessage(styleType)}
			</CredentialCard>
		);
	}

	private renderTypeMessage(type: CredentialState): JSX.Element | undefined {
		const { revoked, replaced, shared } = strings.credentialCard;
		const { Warning } = DidiText.Card;
		const marginTop = this.props.document.preview?.cardLayout ? 0 : 10;
		switch (type) {
			case CredentialStates.normal:
			case CredentialStates.identity:
				return undefined;
			case CredentialStates.revoked:
				return <Warning style={styles.sharedInfo}>{revoked}</Warning>;
			case CredentialStates.obsolete:
				return <Warning style={styles.sharedInfo}>{replaced}</Warning>;
			case CredentialStates.share:
				return <Warning style={[styles.sharedInfo, { marginTop }]}>{shared}</Warning>;

			default:
				assertUnreachable(type);
		}
	}
}

const styles = StyleSheet.create({
	sharedInfo: {
		color: colors.white
	}
});
