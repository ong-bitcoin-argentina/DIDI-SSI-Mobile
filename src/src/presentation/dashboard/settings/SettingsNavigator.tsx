import NavMap, { NavTree } from "../../util/NavMap";

import { StartAccessProps } from "../../access/StartAccess";
import Dashboard, { DashboardScreenProps } from "../home/Dashboard";

import { AboutThisAppScreen } from "./AboutThisApp";
import { ChangePasswordScreen } from "./ChangePassword";
import { IdentitySettingsScreen } from "./identity/IdentitySettings";
import { JWTDecoderScanScreen } from "./JWTDecoderScanScreen";
import { ServiceSettingsScreen } from "./ServiceSettingsScreen";
import SettingsScreen from "./SettingsScreen";
import { ChangeEmailEnterEmailScreen } from "./userData/ChangeEmailEnterEmail";
import { ChangeEmailVerifyScreen } from "./userData/ChangeEmailVerifyEmail";
import { ChangePhoneEnterScreen } from "./userData/ChangePhoneEnterPhone";
import { ChangePhoneVerifyScreen } from "./userData/ChangePhoneVerifyPhone";
import { EditProfileScreen } from "./userMenu/EditProfile";
import { AboutRondaScreen } from "./AboutRonda";
import { CommonQuestionsScreen } from "../../common/CommonQuestions";
import { OpenEmailScreen } from "../../common/OpenEmail";
import { PoliticsScreen } from "../../common/Politics";

export interface SettingsNavigatorNavigation {
	Access: StartAccessProps;
	DashboardHome: DashboardScreenProps;
}

export default function (then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(EditProfileScreen, {
		Settings: NavMap.from(SettingsScreen, {
			DashboardHome: NavMap.from(Dashboard, {}),
			EditProfile: NavMap.from(EditProfileScreen, {}),
			ChangeEmailEnterEmail: NavMap.from(ChangeEmailEnterEmailScreen, {
				ChangeEmailVerifyEmail: NavMap.from(ChangeEmailVerifyScreen, {
					EditProfile: NavMap.placeholder(EditProfileScreen)
				})
			}),
			ChangePhoneEnterPhone: NavMap.from(ChangePhoneEnterScreen, {
				ChangePhoneVerify: NavMap.from(ChangePhoneVerifyScreen, {
					EditProfile: NavMap.placeholder(EditProfileScreen)
				})
			}),
			ChangePassword: NavMap.from(ChangePasswordScreen, {}),
			IdentitySettings: NavMap.from(IdentitySettingsScreen, {}),
			AboutThisAppScreen: NavMap.from(AboutThisAppScreen, {}),
			AboutRonda: NavMap.from(AboutRondaScreen, {}),
			OpenEmail: NavMap.from(OpenEmailScreen,{}),
			Politics: NavMap.from(PoliticsScreen,{}),
			CommonQuestions: NavMap.from(CommonQuestionsScreen, {}),
			ServiceSettings: NavMap.from(ServiceSettingsScreen, {}),
			JWTDecoderScreen: NavMap.from(JWTDecoderScanScreen, {})
		}),
		...then
	});
}