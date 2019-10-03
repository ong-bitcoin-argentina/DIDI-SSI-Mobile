import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import themes from "../../resources/themes";
import DocumentsScreen, { DocumentsScreenNavigation } from "./DocumentsScreen";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { DocumentFilterType } from "../../../model/data/SampleDocument";
import strings from "../../resources/strings";

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
				DocumentsAll: screen(strings.documentFilters.all, type => true),
				DocumentsLivingPlace: screen(strings.documentFilters.livingPlace, type => type === "livingPlace"),
				DocumentsIdentity: screen(strings.documentFilters.identity, type => type === "identity")
			},
			{
				tabBarOptions: {
					style: {
						backgroundColor: themes.navigation
					}
				},
				navigationOptions: NavigationHeaderStyle.withTitleAndFakeBackButton<DocumentsScreenNavigation, "DashboardHome">(
					strings.tabNames.documents,
					"DashboardHome",
					{}
				)
			}
		)
	},
	{
		initialRouteName: "DocumentsScreen"
	}
);
