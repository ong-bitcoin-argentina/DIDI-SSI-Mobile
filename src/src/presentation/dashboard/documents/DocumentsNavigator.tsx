import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import themes from "../../resources/themes";
import DocumentsScreen from "./DocumentsScreen";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { DocumentFilterType } from "../../../model/StoreContent";

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
				DocumentsAll: screen("Todos", type => true),
				DocumentsLivingPlace: screen("Vivienda", type => type === "livingPlace"),
				DocumentsIdentity: screen("Identidad", type => type === "identity")
			},
			{
				tabBarOptions: {
					style: {
						backgroundColor: themes.navigation
					}
				},
				navigationOptions: NavigationHeaderStyle.withTitle("Documentos")
			}
		)
	},
	{
		initialRouteName: "DocumentsScreen"
	}
);
