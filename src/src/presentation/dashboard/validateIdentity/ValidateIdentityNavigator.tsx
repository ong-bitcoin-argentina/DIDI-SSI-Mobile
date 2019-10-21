import NavMap from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";

import { ValidateIdentityBackScreen } from "./ValidateIdentityBack";
import { ValidateIdentityExplainHowScreen } from "./ValidateIdentityExplainHow";
import { ValidateIdentityExplainWhatScreen } from "./ValidateIdentityExplainWhat";
import { ValidateIdentityFrontScreen } from "./ValidateIdentityFront";
import { ValidateIdentityLivenessScreen } from "./ValidateIdentityLiveness";
import { ValidateIdentitySelfieScreen } from "./ValidateIdentitySelfie";

export default function(then: NavMap<DashboardScreenProps>) {
	return NavMap.from(ValidateIdentityExplainWhatScreen, {
		ValidateIdentityHow: NavMap.from(ValidateIdentityExplainHowScreen, {
			ValidateIdentityFront: NavMap.from(ValidateIdentityFrontScreen, {
				ValidateIdentityBack: NavMap.from(ValidateIdentityBackScreen, {
					ValidateIdentitySelfie: NavMap.from(ValidateIdentitySelfieScreen, {
						ValidateIdentityLiveness: NavMap.from(ValidateIdentityLivenessScreen, {
							DashboardRoot: then
						})
					})
				})
			})
		})
	});
}
