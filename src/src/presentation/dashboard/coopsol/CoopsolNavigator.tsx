import NavMap, { NavTree } from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";
import VuIdentityNavigator from '../vuIdentity/VuIdentityNavigator';
import {CoopsolScreen}  from "./CoopsolScreen";
import CoopsolValidationScreen from "./validation/CoopsolValidationScreen";

export interface CoopsolNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	ValidateID: {};
	ValidateCoopsolID: {};
}

export default function (then: NavTree<CoopsolNavigatorNavigation>) {
	return NavMap.from(CoopsolScreen, {
		...then,
		ValidateID: VuIdentityNavigator,
		ValidateCoopsolID: NavMap.from(CoopsolValidationScreen, {}),
	});
}
