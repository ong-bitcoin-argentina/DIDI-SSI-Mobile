import NavMap from "../../util/NavMap";
import { IdentityScreen } from "./IdentityScreen";
import { VuIdentityBackScreen } from "./VuIdentityBack";
import { VuIdentityExplainHowScreen } from "./VuIdentityExplainHow";
import { VuIdentityFrontScreen } from "./VuIdentityFront";
import { VuIdentitySelfieScreen } from "./VuIdentitySelfieScreen";
import { VuIdentitySubmitScreen } from "./VuIdentitySubmitScreen";
export default NavMap.from(IdentityScreen, {
	VuIdentityHow: NavMap.from(VuIdentityExplainHowScreen, {
		VuIdentityFront: NavMap.from(VuIdentityFrontScreen, {
			VuIdentityBack: NavMap.from(VuIdentityBackScreen, {
				VuIdentitySelfie: NavMap.from(VuIdentitySelfieScreen, {
					VuIdentitySubmit: NavMap.from(VuIdentitySubmitScreen, {})
				})
			})
		})
	})
});
