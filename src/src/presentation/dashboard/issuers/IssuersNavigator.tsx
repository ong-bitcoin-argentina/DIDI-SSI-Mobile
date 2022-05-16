import NavMap, { NavTree } from "../../util/NavMap";

import SettingsNavigator, { SettingsNavigatorNavigation } from "../settings/SettingsNavigator";

import { IssuersScreenNavigator } from './IssuersScreenNavigator';

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(IssuersScreenNavigator, {
		...then,
		__DocumentsSettings: SettingsNavigator(then)
	});
}
