import React from "react";

import CredentialCard from "./CredentialCard";

import { flattenClaim } from "../../../uPort/types/Claim";
import colors from "../../resources/colors";
import { SampleDocument } from "../../../model/data/SampleDocument";
import { CredentialDocument } from "../../../model/data/CredentialDocument";

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

export function uPortDocumentToCard(document: CredentialDocument) {
	const { root, rest } = flattenClaim(document.content.claims);
	const data = Object.entries(rest).map(([key, value]) => {
		return { label: key, value };
	});
	const issuer = document.content.issuer.replace("did:ethr:0x", "").slice(0, 20);
	return (
		<CredentialCard
			key={document.jwt}
			icon=""
			category="Credencial"
			title={root === "" ? "(Multiples credenciales)" : root}
			subTitle={"Emisor: " + issuer + "..."}
			data={data}
			columns={1}
			color={colors.secondary}
		/>
	);
}
