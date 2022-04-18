import NavMap, { NavTree } from "../../util/NavMap";
import SemillasScreen from "./SemillasScreen";
import PrestadoresScreen from "./PrestadoresScreen";
import BeneficiarioScreen from "./BeneficiarioScreen";

import { DashboardScreenProps } from "../home/Dashboard";
import RequestFinishedScreen from "./RequestFinishedScreen";
import SemillasValidationScreen from "./validation/SemillasValidationScreen";
import VuIdentityNavigator from '../vuIdentity/VuIdentityNavigator';

export interface SemillasNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: {};
	Beneficiario: {};
	ValidateID: {};
	ValidateSemillasID: {};
}

export default function (then: NavTree<SemillasNavigatorNavigation>) {
	return NavMap.from(SemillasScreen, {
		...then,
		ValidateID: VuIdentityNavigator,
		ValidateSemillasID: NavMap.from(SemillasValidationScreen, {}),
		Prestadores: NavMap.from(PrestadoresScreen, {
			Beneficiario: NavMap.from(BeneficiarioScreen, {
				RequestFinished: NavMap.from(RequestFinishedScreen, {})
			})
		})
	});
}
