import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import { NavigationEnabledComponentConstructor } from "../../util/NavMap";
import themes from "../../resources/themes";
import { DocumentsScreen } from "./DocumentsScreen";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

function screen(constructor: NavigationEnabledComponentConstructor<any, any>, title: string) {
	return {
		screen: constructor,
		navigationOptions: {
			title
		}
	};
}

export default createStackNavigator(
	{
		DocumentsScreen: createMaterialTopTabNavigator(
			{
				DocumentsAll: screen(DocumentsScreen, "Todos"),
				DocumentsLivingPlace: screen(DocumentsScreen, "Vivienda"),
				DocumentsIdentity: screen(DocumentsScreen, "Identidad")
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
