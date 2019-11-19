import NavMap, { NavTree } from "../../util/NavMap";

import { StartAccessProps } from "../../access/StartAccess";
import { DashboardScreenProps } from "../home/Dashboard";

import { AboutThisAppScreen } from "./AboutThisApp";
import { ChangePasswordScreen } from "./ChangePassword";
import IdentitySettingsScreen from "./identity/IdentitySettings";
import { JWTDecoderScanScreen } from "./JWTDecoderScanScreen";
import { ServiceSettingsScreen } from "./ServiceSettingsScreen";
import SettingsScreen from "./SettingsScreen";
import { ChangeEmailEnterEmailScreen } from "./userData/ChangeEmailEnterEmail";
import { ChangeEmailVerifyScreen } from "./userData/ChangeEmailVerifyEmail";
import { ChangePhoneEnterScreen } from "./userData/ChangePhoneEnterPhone";
import { ChangePhoneVerifyScreen } from "./userData/ChangePhoneVerifyPhone";
import UserDataScreen from "./userData/UserData";
import { EditProfileScreen } from "./userMenu/EditProfile";
import { ShareProfileScreen } from "./userMenu/ShareProfile";

interface SettingsNavigatorNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
}

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(SettingsScreen, {
		UserData: NavMap.from(UserDataScreen, {
			ShareProfile: NavMap.from(ShareProfileScreen, {}),
			ChangePhoneEnterPhone: NavMap.from(ChangePhoneEnterScreen, {
				ChangePhoneVerify: NavMap.from(ChangePhoneVerifyScreen, {
					UserData: NavMap.placeholder(UserDataScreen)
				})
			}),
			ChangeEmailEnterEmail: NavMap.from(ChangeEmailEnterEmailScreen, {
				ChangeEmailVerifyEmail: NavMap.from(ChangeEmailVerifyScreen, {
					UserData: NavMap.placeholder(UserDataScreen)
				})
			}),
			EditProfile: NavMap.from(EditProfileScreen, {})
		}),
		ChangePassword: NavMap.from(ChangePasswordScreen, {}),
		IdentitySettings: NavMap.from(IdentitySettingsScreen, {}),
		AboutThisAppScreen: NavMap.from(AboutThisAppScreen, {}),
		ServiceSettings: NavMap.from(ServiceSettingsScreen, {}),
		JWTDecoderScreen: NavMap.from(JWTDecoderScanScreen, {}),
		...then
	});
}
