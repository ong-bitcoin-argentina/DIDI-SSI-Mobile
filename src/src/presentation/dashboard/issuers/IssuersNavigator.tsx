import NavMap, { NavTree } from "../../util/NavMap";
import ShareCredential from '../credentials/ShareCredential';
import { ShareRespScreen } from '../credentials/shareResp';
import SettingsNavigator, { SettingsNavigatorNavigation } from "../settings/SettingsNavigator";
import { IssuerDetailScreen } from './IssuerDetail';

import { IssuersScreenNavigator } from './IssuersScreenNavigator';

export default function(then: NavTree<SettingsNavigatorNavigation>) {
	return NavMap.from(IssuersScreenNavigator, {
		...then,
		IssuerDetail: NavMap.from(IssuerDetailScreen, {
		ShareCredential: NavMap.from(ShareCredential, {
			ShareResp: NavMap.from(ShareRespScreen,{})
		}),
		}),
		__DocumentsSettings: SettingsNavigator(then)
	});
}
