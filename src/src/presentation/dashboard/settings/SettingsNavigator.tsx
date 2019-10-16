import NavMap, { NavTree } from "../../util/NavMap";
import SettingsScreen from "./SettingsScreen";
import UserDataScreen from "./userData/UserData";
import ChangePasswordScreen from "./userMenu/ChangePassword";
import EditProfileScreen from "./userMenu/EditProfile";
import { ShareProfileScreen } from "./userMenu/ShareProfile";
import IdentitySettingsScreen from "./identity/IdentitySettings";
import { StartAccessProps } from "../../access/StartAccess";
import { DashboardScreenProps } from "../home/Dashboard";
import { AboutThisAppScreen } from "./AboutThisApp";
import { ServiceSettingsScreen } from "./ServiceSettingsScreen";
import { JWTDecoderScanScreen } from "./JWTDecoderScanScreen";

interface SettingsNavigatorNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
}

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(SettingsScreen, {
		UserData: NavMap.from(UserDataScreen, {
			EditProfile: NavMap.from(EditProfileScreen, {}),
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
