import NavMap from "../../util/NavMap";

import { ValidateIdentityBackScreen } from "./ValidateIdentityBack";
import { ValidateIdentityExplainHowScreen } from "./ValidateIdentityExplainHow";
import { ValidateIdentityExplainWhatScreen } from "./ValidateIdentityExplainWhat";
import { ValidateIdentityFrontScreen } from "./ValidateIdentityFront";
import { ValidateIdentitySelfieScreen } from "./ValidateIdentitySelfie";
import { ValidateIdentitySubmitScreen } from "./ValidateIdentitySubmit";

export default NavMap.from(ValidateIdentityExplainWhatScreen, {
	ValidateIdentityHow: NavMap.from(ValidateIdentityExplainHowScreen, {
		ValidateIdentityFront: NavMap.from(ValidateIdentityFrontScreen, {
			ValidateIdentityBack: NavMap.from(ValidateIdentityBackScreen, {
				ValidateIdentitySelfie: NavMap.from(ValidateIdentitySelfieScreen, {
					ValidateIdentitySubmit: NavMap.from(ValidateIdentitySubmitScreen, {})
				})
			})
		})
	})
});
