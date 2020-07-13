import NavMap, { NavTree } from "../../util/NavMap";
import SemillasScreen from "./SemillasScreen";
import PrestadoresScreen from "./PrestadoresScreen";
import BeneficiarioScreen from "./BeneficiarioScreen";

import { DashboardScreenProps } from "../home/Dashboard";
import RequestFinishedScreen from "./RequestFinishedScreen";

export interface SemillasNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: {};
	Beneficiario: {};
}

export default function (then: NavTree<SemillasNavigatorNavigation>) {
	return NavMap.from(SemillasScreen, {
		...then,
		Prestadores: NavMap.from(PrestadoresScreen, {
			Beneficiario: NavMap.from(BeneficiarioScreen, {
				RequestFinished: NavMap.from(RequestFinishedScreen, {})
			})
		})
	});
}
