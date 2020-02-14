import NavMap, { NavTree } from "../../util/NavMap";

import SettingsNavigator, { SettingsNavigatorNavigation } from "../settings/SettingsNavigator";

import { DocumentDetailScreen } from "./DocumentDetail";
import { DocumentsScreenNavigator } from "./DocumentsScreenNavigator";

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(DocumentsScreenNavigator, {
		...then,
		DocumentDetail: NavMap.from(DocumentDetailScreen, {}),
		__DocumentsSettings: SettingsNavigator(then)
	});
}
