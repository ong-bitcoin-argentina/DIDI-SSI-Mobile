import NavMap from "../../util/NavMap";
import SettingsScreen from "./SettingsScreen";
import UserDataScreen from "./userData/UserData";
import ChangePasswordScreen from "./userMenu/ChangePassword";
import EditProfileScreen from "./userMenu/EditProfile";
import ShareScreen from "./userMenu/Share";
import UportIdentityScreen from "./UportIdentity";

export default NavMap.from(SettingsScreen, {
	UserData: NavMap.from(UserDataScreen, {
		ChangePassword: NavMap.from(ChangePasswordScreen, {}),
		EditProfile: NavMap.from(EditProfileScreen, {}),
		Share: NavMap.from(ShareScreen, {}),
		UportIdentity: NavMap.from(UportIdentityScreen, {})
	})
});
