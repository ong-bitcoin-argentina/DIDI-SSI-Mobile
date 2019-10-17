import React from "react";

import CredentialCard from "./CredentialCard";

import colors from "../../resources/colors";
import { SampleDocument } from "../../../model/SampleDocument";
import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";

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

export function uPortDocumentToCard(document: DerivedCredential<CredentialDocument>, index: number) {
	const data = Object.entries(document.claims).map(([key, value]) => {
		return { label: key, value };
	});
	const issuer = document.data.issuer.replace("did:ethr:0x", "").slice(0, 20);
	const category = document.data.issuedAt ? new Date(document.data.issuedAt * 1000).toLocaleString() : "Credencial";
	return (
		<CredentialCard
			key={index}
			icon=""
			category={category}
			title={document.rootClaim}
			subTitle={"Emisor: " + issuer + "..."}
			data={data}
			columns={1}
			color={colors.secondary}
		/>
	);
}
