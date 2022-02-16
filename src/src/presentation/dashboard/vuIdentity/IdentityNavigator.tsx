import NavMap, { NavTree } from "../../util/NavMap";
import { DashboardScreenProps } from '../home/Dashboard';
import SemillasValidationScreen from '../semillas/validation/SemillasValidationScreen';
import ValidateIdentityNavigator from '../validateIdentity/ValidateIdentityNavigator';
import { IdentityScreen } from './IdentityScreen';
import VuIdentityNavigator from './VuIdentityNavigator';


export interface IdentityNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	VuIdentityID: {};
	ValidateSemillasID: {};
}

export default function (then: NavTree<IdentityNavigatorNavigation>) {
	return NavMap.from(IdentityScreen, {
		...then,
		ValidateID: ValidateIdentityNavigator,
		VuIdentityID: VuIdentityNavigator,
		ValidateSemillasID: NavMap.from(SemillasValidationScreen, {}),
	});
}
