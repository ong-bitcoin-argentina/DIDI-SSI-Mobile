import { CredentialDocument, EthrDID } from "didi-sdk";
import { withMappedNavigationParams } from "react-navigation-props-mapper";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";

import colors from "../../resources/colors";
import strings from "../../resources/strings";

import { DocumentDetailScreen } from "./DocumentDetail";
import DocumentsScreen, { DocumentsScreenNavigation } from "./DocumentsScreen";

function screen(title: string, filter: (type: CredentialDocument, did: EthrDID) => boolean) {
	return {
		screen: DocumentsScreen(filter),
		navigationOptions: {
			title
		}
	};
}

export default createStackNavigator(
	{
		DocumentsScreen: createMaterialTopTabNavigator(
			{
				DocumentsAll: screen(strings.documents.filterAll, () => true),
				DocumentsEducation: screen(strings.documents.filterEducation, doc => doc.category === "education"),
				DocumentsLivingPlace: screen(strings.documents.filterLivingPlace, doc => doc.category === "livingPlace"),
				DocumentsFinance: screen(strings.documents.filterFinance, doc => doc.category === "finance"),
				DocumentsIdentity: screen(strings.documents.filterIdentity, doc => doc.category === "identity"),
				DocumentsShared: screen(strings.documents.filterShared, (doc, did) => doc.subject.did() !== did.did())
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
		),
		DocumentDetail: withMappedNavigationParams()(DocumentDetailScreen)
	},
	{
		initialRouteName: "DocumentsScreen"
	}
);
