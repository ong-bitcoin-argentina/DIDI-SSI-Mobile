import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import { withMappedNavigationParams } from "react-navigation-props-mapper";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";

import { DocumentFilterType } from "../../../model/SampleDocument";
import strings from "../../resources/strings";
import themes from "../../resources/themes";

import { DocumentDetailScreen } from "./DocumentDetail";
import DocumentsScreen, { DocumentsScreenNavigation } from "./DocumentsScreen";

function screen(title: string, filter: (type: DocumentFilterType) => boolean) {
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
				DocumentsAll: screen(strings.documents.filterAll, type => true),
				DocumentsLivingPlace: screen(strings.documents.filterLivingPlace, type => type === "livingPlace"),
				DocumentsIdentity: screen(strings.documents.filterIdentity, type => type === "identity")
			},
			{
				tabBarOptions: {
					style: {
						backgroundColor: themes.navigation
					}
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
