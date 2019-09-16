import NavMap from "../../util/NavMap";
import SettingsScreen from "./SettingsScreen";
import UserDataScreen from "./UserData";

export default NavMap.from(SettingsScreen, {
	UserData: NavMap.from(UserDataScreen, {})
});
