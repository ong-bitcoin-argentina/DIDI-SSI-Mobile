import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import { DocumentFilterType, SampleDocument } from "../../../model/data/SampleDocument";
import { connect } from "react-redux";
import { DashboardScreenProps } from "../home/Dashboard";
import { StoreContent } from "../../../model/store";
import { uPortDocumentToCard, sampleDocumentToCard } from "../common/documentToCard";
import { UPortDocument } from "../../../model/data/UPortDocument";

export type DocumentsScreenNavigation = {
	DashboardHome: DashboardScreenProps;
};

export type DocumentsScreenProps = {};
interface DocumentsScreenInternalProps extends DocumentsScreenProps {
	documents: UPortDocument[];
	samples: SampleDocument[];
	filter: (type: DocumentFilterType) => boolean;
}

type DocumentsScreenState = {};

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
						{this.props.filter("other") && this.props.documents.map(uPortDocumentToCard)}
						{this.props.samples.filter(sample => this.props.filter(sample.filterType)).map(sampleDocumentToCard)}
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

export default function(filter: (type: DocumentFilterType) => boolean) {
	return connect(
		(state: StoreContent): DocumentsScreenInternalProps => {
			return {
				filter,
				samples: state.samples,
				documents: state.documents
			};
		}
	)(DocumentsScreen);
}

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	scrollContent: {
		paddingBottom: 15
	},
	text: {
		fontSize: 14
	},
	textStyleWhite: {
		color: "#FFF"
	}
});
