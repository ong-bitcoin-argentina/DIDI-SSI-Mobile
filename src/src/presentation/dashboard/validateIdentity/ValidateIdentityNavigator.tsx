import NavMap, { NavTree } from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";

import { ValidateIdentityExplainWhatScreen } from "./ValidateIdentityExplainWhat";
import { ValidateIdentityExplainHowScreen } from "./ValidateIdentityExplainHow";
import { ValidateIdentityFrontScreen } from "./ValidateIdentityFront";
import { ValidateIdentityBackScreen } from "./ValidateIdentityBack";
import { ValidateIdentitySelfieScreen } from "./ValidateIdentitySelfie";
import { ValidateIdentityLivenessScreen } from "./ValidateIdentityLiveness";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(ValidateIdentityExplainWhatScreen, {
		ValidateIdentityHow: NavMap.from(ValidateIdentityExplainHowScreen, {
			ValidateIdentityFront: NavMap.from(ValidateIdentityFrontScreen, {
				ValidateIdentityBack: NavMap.from(ValidateIdentityBackScreen, {
					ValidateIdentitySelfie: NavMap.from(ValidateIdentitySelfieScreen, {
						ValidateIdentityLiveness: NavMap.from(ValidateIdentityLivenessScreen, {})
					})
				})
			})
		})
	});
}