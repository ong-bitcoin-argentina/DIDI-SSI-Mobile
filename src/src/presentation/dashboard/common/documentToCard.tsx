import React from "react";

import DidiCardData from "./DidiCardData";
import DidiCard from "./DidiCard";

import { flattenClaim } from "../../../uPort/VerifiedClaim";
import { Document } from "../../../model/data/Document";
import { ViewStyle, StyleSheet } from "react-native";
import colors from "../../resources/colors";

export function documentToCard(document: Document, index: number) {
	switch (document.type) {
		case "didi":
			return (
				<DidiCard
					key={index}
					icon={document.icon}
					image={document.image}
					category={document.category}
					title={document.title}
					subTitle={document.subtitle}
					textStyle={styles.textStyleWhite}
					style={styles.document}
				>
					<DidiCardData data={document.data} textStyles={styles.textStyleWhite} columns={document.columns} />
				</DidiCard>
			);
		case "uPort":
			const { root, rest } = flattenClaim(document.claim.claims);
			const data = Object.entries(rest).map(([key, value]) => {
				return { label: key, value };
			});
			const issuer = document.claim.issuer.replace("did:ethr:0x", "").slice(0, 20);
			return (
				<DidiCard
					key={index}
					icon=""
					category="Credencial"
					title={root === "" ? "(Multiples credenciales)" : root}
					subTitle={"Emisor: " + issuer + "..."}
					textStyle={styles.textStyleWhite}
					style={styles.document}
				>
					<DidiCardData data={data} textStyles={styles.textStyleWhite} columns={1} />
				</DidiCard>
			);
	}
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
