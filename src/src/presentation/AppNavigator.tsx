import { createSwitchNavigator } from "react-navigation";

import NavMap from "./util/NavMap";

import AccessNavigator from "./access/AccessNavigator";
import { StartAccessScreen } from "./access/StartAccess";
import DashboardNavigator from "./dashboard/DashboardNavigator";
import DashboardScreen from "./dashboard/home/Dashboard";
import { SplashScreen } from "./SplashScreen";

export default createSwitchNavigator({
	Spash: SplashScreen,
	Access: AccessNavigator({
		Dashboard: NavMap.placeholder(DashboardScreen)
	}).stackNavigator("Access"),
	Dashboard: DashboardNavigator({
		Access: NavMap.placeholder(StartAccessScreen)
	})
});
