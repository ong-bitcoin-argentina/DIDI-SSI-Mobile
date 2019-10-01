import { SplashScreen } from "./SplashScreen";
import AccessNavigator from "./access/AccessNavigator";
import DashboardNavigator from "./dashboard/DashboardNavigator";
import { createSwitchNavigator } from "react-navigation";
import NavMap from "./util/NavMap";
import DashboardScreen from "./dashboard/home/Dashboard";
import { StartAccessScreen } from "./access/StartAccess";

export default createSwitchNavigator({
	Spash: SplashScreen,
	Access: AccessNavigator({
		Dashboard: NavMap.placeholder(DashboardScreen)
	}).stackNavigator("Access"),
	Dashboard: DashboardNavigator({
		Access: NavMap.placeholder(StartAccessScreen)
	})
});
