import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import colors from "../../resources/colors";
import strings from "../../resources/strings";
import { NavigatorProps } from "../DashboardNavigator";

import IssuersScreen, {}  from './IssuersScreen';

type IssuersScreenNavigation = {
    DashboardHome: {};
    DocumentDetail: any;
}

function screen(title: string, result : any ) {
	console.log(result);
	
	return {
		screen: IssuersScreen,
		navigationOptions: {
			title
		}
	};
}


export const IssuersScreenInnerNavigator = createMaterialTopTabNavigator(
	{
		IssuersAll: screen("TODOS", () => true),
		IssuersBuenosAires:  screen("Buenos Aires", () => true),
		IssuersCABA:  screen("CABA", () => true),
		IssuersCatamarca:  screen("Catamarca", () => true),
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
		navigationOptions: NavigationHeaderStyle.withTitleAndFakeBackButton<IssuersScreenNavigation, "DashboardHome">(
			strings.documents.barTitle,
			"DashboardHome",
			{}
		)
	}
);



export class IssuersScreenNavigator extends NavigationEnabledComponent<
NavigatorProps,
	{},
	{}
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		{},
		"DashboardHome"
	>("Emisores Confiables", "DashboardHome", {});

	static router = IssuersScreenInnerNavigator.router;

	render() {
		const { navigation } = this.props;
		return <IssuersScreenInnerNavigator navigation={navigation} />;
	}
}
