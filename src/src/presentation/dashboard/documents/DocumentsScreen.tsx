import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import strings from "../../resources/strings";
import { Document, DocumentFilterType, LoggedInStoreContent } from "../../../model/StoreContent";
import { connect } from "react-redux";
import colors from "../../resources/colors";
import DidiCard, { DidiCardProps } from "../Card";
import { AddChildren } from "../../../util/ReactExtensions";
import DidiCardData from "../CardData";

export type DocumentsScreenNavigation = {};

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
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.tabNames.documents);

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
						{this.props.documents
							.filter(card => this.props.filter(card.filterType))
							.map((card, index) => {
								return <DidiCard key={index} {...this.documentToCard(card)} />;
							})}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}

	private documentToCard(document: Document): AddChildren<DidiCardProps> {
		return {
			icon: document.icon,
			image: document.image,
			category: document.category,
			title: document.title,
			subTitle: document.subtitle,
			textStyle: styles.textStyleWhite,
			cardStyle: cardStyles.document,
			children: (
				<DidiCardData data={document.data} textStyles={styles.textStyleWhite} isHorizontal={document.isHorizontal} />
			)
		};
	}
}

export default function(filter: (type: DocumentFilterType) => boolean) {
	return connect(
		(state: LoggedInStoreContent): DocumentsScreenInternalProps => {
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
		backgroundColor: colors.secondary
	}
});
