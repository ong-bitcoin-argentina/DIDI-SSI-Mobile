import NavMap from "../../util/NavMap";
import SettingsScreen from "./SettingsScreen";
import UserDataScreen from "./userData/UserData";
import ChangePasswordScreen from "./userMenu/ChangePassword";
import EditProfileScreen from "./userMenu/EditProfile";
import { ShareProfileScreen } from "./userMenu/ShareProfile";
import UportIdentityScreen from "./UportIdentity";

export default NavMap.from(SettingsScreen, {
	UserData: NavMap.from(UserDataScreen, {
		ChangePassword: NavMap.from(ChangePasswordScreen, {}),
		EditProfile: NavMap.from(EditProfileScreen, {}),
		ShareProfile: NavMap.from(ShareProfileScreen, {}),
		UportIdentity: NavMap.from(UportIdentityScreen, {})
	})
});
