import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import { Document, DocumentFilterType } from "../../../model/data/Document";
import { connect } from "react-redux";
import colors from "../../resources/colors";
import DidiCard, { DidiCardProps } from "../common/DidiCard";
import { AddChildren } from "../../../util/ReactExtensions";
import DidiCardData from "../common/DidiCardData";
import { DashboardScreenProps } from "../home/Dashboard";
import { StoreContent } from "../../../model/store";
import { flattenClaim } from "../../../uPort/VerifiedClaim";

export type DocumentsScreenNavigation = {
	DashboardHome: DashboardScreenProps;
};

export type DocumentsScreenProps = {};
interface DocumentsScreenInternalProps extends DocumentsScreenProps {
	documents: Document[];
	filter: (type: DocumentFilterType) => boolean;
}

type DocumentsScreenState = {};

const filterTypes: DocumentFilterType[] = ["identity", "livingPlace", "other"];

class DocumentsScreen extends NavigationEnabledComponent<
	DocumentsScreenInternalProps,
	DocumentsScreenState,
	DocumentsScreenNavigation
> {
	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						{this.props.documents.filter(card => this.props.filter(card.filterType)).map(this.documentToCard)}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}

	private documentToCard(document: Document, index: number) {
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
						style={cardStyles.document}
					>
						<DidiCardData data={document.data} textStyles={styles.textStyleWhite} columns={document.columns} />
					</DidiCard>
				);
			case "uPort":
				const { root, rest } = flattenClaim(document.claim.claims);
				const data = Object.entries(rest).map(([key, value]) => {
					return { label: key, value };
				});
				return (
					<DidiCard
						key={index}
						icon=""
						category="Credencial"
						title={root === "" ? "(Multiples credenciales)" : root}
						subTitle={document.claim.issuer}
						textStyle={styles.textStyleWhite}
						style={cardStyles.document}
					>
						<DidiCardData data={data} textStyles={styles.textStyleWhite} columns={1} />
					</DidiCard>
				);
		}
	}
}

export default function(filter: (type: DocumentFilterType) => boolean) {
	return connect(
		(state: StoreContent): DocumentsScreenInternalProps => {
			return {
				filter,
				documents: state.documents
			};
		}
	)(DocumentsScreen);
}

const styles = StyleSheet.create({
	body: {
		width: "100%",
		paddingHorizontal: 20
	},
	scrollContent: {
		paddingTop: 15
	},
	text: {
		fontSize: 14
	},
	textStyleWhite: {
		color: "#FFF"
	}
});

const cardStyles = StyleSheet.create({
	evolution: {
		backgroundColor: colors.primary
	},
	identityIncomplete: {
		backgroundColor: "#FFF",
		borderColor: colors.secondary,
		borderWidth: 2
	},
	document: {
		backgroundColor: colors.secondary,
		marginBottom: 15
	}
});
