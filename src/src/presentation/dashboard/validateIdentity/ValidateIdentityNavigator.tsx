import NavMap, { NavTree } from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";

import { ValidateIdentityExplainWhatScreen } from "./ValidateIdentityExplainWhat";
import { ValidateIdentityExplainHowScreen } from "./ValidateIdentityExplainHow";
import { ValidateIdentityScanFrontScreen } from "./ValidateIdentityScanFront";
import { ValidateIdentityExplainFrontScreen } from "./ValidateIdentityExplainFront";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(ValidateIdentityExplainWhatScreen, {
		ValidateIdentityHow: NavMap.from(ValidateIdentityExplainHowScreen, {
			ValidateIdentityExplainFront: NavMap.from(ValidateIdentityExplainFrontScreen, {
				ValidateIdentityScanFront: NavMap.from(ValidateIdentityScanFrontScreen, {})
			})
		})
	});
}
