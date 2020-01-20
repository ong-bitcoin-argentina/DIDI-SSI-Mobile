import { DocumentFilterType } from "didi-sdk";
import { withMappedNavigationParams } from "react-navigation-props-mapper";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";

import colors from "../../resources/colors";
import strings from "../../resources/strings";

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
					indicatorStyle: {
						backgroundColor: colors.secondary
					},
					style: {
						backgroundColor: colors.primary
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
