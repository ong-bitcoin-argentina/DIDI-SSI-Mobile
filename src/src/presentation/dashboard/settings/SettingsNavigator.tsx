import NavMap, { NavTree } from "../../util/NavMap";

import { StartAccessProps } from "../../access/StartAccess";
import { DashboardScreenProps } from "../home/Dashboard";

import { AboutThisAppScreen } from "./AboutThisApp";
import ChangePasswordScreen from "./ChangePassword";
import IdentitySettingsScreen from "./identity/IdentitySettings";
import { JWTDecoderScanScreen } from "./JWTDecoderScanScreen";
import { ServiceSettingsScreen } from "./ServiceSettingsScreen";
import SettingsScreen from "./SettingsScreen";
import UserDataScreen from "./userData/UserData";
import { ShareProfileScreen } from "./userMenu/ShareProfile";

interface SettingsNavigatorNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
}

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(SettingsScreen, {
		UserData: NavMap.from(UserDataScreen, {
			ShareProfile: NavMap.from(ShareProfileScreen, {})
		}),
		ChangePassword: NavMap.from(ChangePasswordScreen, {}),
		IdentitySettings: NavMap.from(IdentitySettingsScreen, {}),
		AboutThisAppScreen: NavMap.from(AboutThisAppScreen, {}),
		ServiceSettings: NavMap.from(ServiceSettingsScreen, {}),
		JWTDecoderScreen: NavMap.from(JWTDecoderScanScreen, {}),
		...then
	});
}
