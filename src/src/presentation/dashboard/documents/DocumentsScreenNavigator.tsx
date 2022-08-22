import { CredentialDocument, DocumentFilterType, EthrDID } from "@proyecto-didi/app-sdk";
import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import colors from "../../resources/colors";
import strings from "../../resources/strings";
import { NavigatorProps } from "../DashboardNavigator";
import { DashboardScreenProps } from "../home/Dashboard";

import { DocumentDetailProps } from "./DocumentDetail";
import DocumentsScreen, { DocumentsScreenNavigation } from "./DocumentsScreen";
import { RecentActivity } from "../../../model/RecentActivity";

function screen(title: string, filter: (type: CredentialDocument, did: EthrDID) => boolean) {
	return {
		screen: DocumentsScreen(filter),
		navigationOptions: {
			title
		}
	};
}

const categoryFilter = (category: DocumentFilterType, share?: string ) => (doc: CredentialDocument, did: EthrDID, recentActivity?: RecentActivity[]) => {
	if (share === 'SHARE' && recentActivity) {
		const titleCompare = doc.specialFlag ? strings.specialCredentials[doc.specialFlag.type].title : doc.title;
		for (const iterator of recentActivity) {
			if (iterator.credentialTitle[0] === titleCompare && iterator.credentialKey[0] === doc.category && iterator.issuedAt[0] === doc.issuedAt){
				return true
			}
		}	
		return doc.subject.did() !== did.did()
	}
	return doc.category === category && doc.subject.did() === did.did();
};

export const DocumentsScreenInnerNavigator = createMaterialTopTabNavigator(
	{
		DocumentsAll: screen(strings.documents.filterAll, () => true),
		DocumentsBenefits: screen(strings.documents.filterBenefits, categoryFilter("benefit")),
		DocumentsWork: screen(strings.documents.filterWork, categoryFilter("work")),
		DocumentsEducation: screen(strings.documents.filterEducation, categoryFilter("education")),
		DocumentsLivingPlace: screen(strings.documents.filterLivingPlace, categoryFilter("livingPlace")),
		DocumentsFinance: screen(strings.documents.filterFinance, categoryFilter("finance")),
		DocumentsIdentity: screen(strings.documents.filterIdentity, categoryFilter("identity")),
		DocumentsShared: screen(strings.documents.filterShared, categoryFilter("work","SHARE"))
	},
	{
		tabBarOptions: {
			indicatorStyle: {
				backgroundColor: colors.secondary
			},
			style: {
				backgroundColor: colors.primary
			},
			scrollEnabled: true,
			tabStyle: { width: "auto" }
		},
		navigationOptions: NavigationHeaderStyle.withTitleAndFakeBackButton<DocumentsScreenNavigation, "DashboardHome">(
			strings.documents.barTitle,
			"DashboardHome",
			{}
		)
	}
);

export interface DocumentsScreenNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	DocumentDetail: DocumentDetailProps;
	__DocumentsSettings: {};
}

export class DocumentsScreenNavigator extends NavigationEnabledComponent<
	NavigatorProps,
	{},
	DocumentsScreenNavigatorNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		DocumentsScreenNavigatorNavigation,
		"DashboardHome"
	>(strings.tabNames.documents, "DashboardHome", {});

	static router = DocumentsScreenInnerNavigator.router;

	render() {
		const { navigation } = this.props;
		return <DocumentsScreenInnerNavigator navigation={navigation} />;
	}
}
