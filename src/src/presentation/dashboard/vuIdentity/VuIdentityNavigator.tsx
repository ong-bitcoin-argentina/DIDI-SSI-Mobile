import NavMap from "../../util/NavMap";
import { VuIdentityBackScreen } from './VuIdentityBack';
import { VuIdentityExplainHowScreen } from './VuIdentityExplainHow';
import { VuIdentityFrontScreen} from './VuIdentityFront';
import { VuIdentitySubmitScreen } from './VuIdentitySubmit';
export default NavMap.from(VuIdentityExplainHowScreen, {
	VuIdentityFront: NavMap.from(VuIdentityFrontScreen, {
		VuIdentityBack: NavMap.from(VuIdentityBackScreen, {
			VuIdentitySubmit: NavMap.from(VuIdentitySubmitScreen,{

			})
		})
	})
});
