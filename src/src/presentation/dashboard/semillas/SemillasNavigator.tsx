import NavMap, { NavTree } from "../../util/NavMap";
import SemillasScreen from './SemillasScreen';
import PrestadoresScreen from './PrestadoresScreen';
import BeneficiaryScreen from './BeneficiaryScreen';

import { DashboardScreenProps } from "../home/Dashboard";

export interface SemillasNavigatorNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: {};
	Beneficiary: {};
	
}

export default function(then: NavTree<SemillasNavigatorNavigation>) {
	return NavMap.from(SemillasScreen, {
		...then,
		Prestadores: NavMap.from(PrestadoresScreen, {
			Beneficiary: NavMap.from(BeneficiaryScreen, {

			})
		}),
	});
}
