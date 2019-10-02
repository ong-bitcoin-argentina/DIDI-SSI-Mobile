import React from "react";

import DidiCard from "./DidiCard";

import { flattenClaim } from "../../../uPort/VerifiedClaim";
import { ViewStyle, StyleSheet } from "react-native";
import colors from "../../resources/colors";
import { SampleDocument } from "../../../model/data/SampleDocument";
import { UPortDocument } from "../../../model/data/UPortDocument";

export function sampleDocumentToCard(document: SampleDocument, index: number) {
	return (
		<DidiCard
			key={"didi" + index}
			icon={document.icon}
			category={document.category}
			title={document.title}
			subTitle={document.subtitle}
			textStyle={styles.textStyleWhite}
			style={styles.document}
			data={document.data}
			columns={document.columns}
		/>
	);
}

export function uPortDocumentToCard(document: UPortDocument) {
	const { root, rest } = flattenClaim(document.claim.claims);
	const data = Object.entries(rest).map(([key, value]) => {
		return { label: key, value };
	});
	const issuer = document.claim.issuer.replace("did:ethr:0x", "").slice(0, 20);
	return (
		<DidiCard
			key={document.jwt}
			icon=""
			category="Credencial"
			title={root === "" ? "(Multiples credenciales)" : root}
			subTitle={"Emisor: " + issuer + "..."}
			textStyle={styles.textStyleWhite}
			style={styles.document}
			data={data}
			columns={1}
		/>
	);
}

export const commonCardStyle: ViewStyle = {
	marginHorizontal: 20,
	marginTop: 15,
	backgroundColor: colors.secondary
};

const styles = StyleSheet.create({
	document: commonCardStyle,
	textStyleWhite: {
		color: "#FFF"
	},
	textStyleBlue: {
		color: colors.secondary
	}
});
