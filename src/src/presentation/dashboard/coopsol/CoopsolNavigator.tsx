import NavMap, { NavTree } from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";
import VuIdentityNavigator from '../vuIdentity/VuIdentityNavigator';
import { CoopsolScreen } from "./CoopsolScreen";

export interface CoopsolNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: {};
	Beneficiario: {};
	ValidateID: {};
	ValidateSemillasID: {};
}

export default function (then: NavTree<CoopsolNavigatorNavigation>) {
	return NavMap.from(CoopsolScreen, {
		...then,
		ValidateID: VuIdentityNavigator
	});
}
