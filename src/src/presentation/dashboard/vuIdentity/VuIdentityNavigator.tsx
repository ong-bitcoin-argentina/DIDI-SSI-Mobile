import NavMap from "../../util/NavMap";
import { VuIdentityBackScreen } from '../vuIdentity/VuIdentityBack';

import { VuIdentityExplainHowScreen } from '../vuIdentity/VuIdentityExplainHow';
import { VuIdentityFrontScreen} from '../vuIdentity/VuIdentityFront';

export default NavMap.from(VuIdentityExplainHowScreen, {
	VuIdentityFront: NavMap.from(VuIdentityFrontScreen, {
		VuIdentityBack: NavMap.from(VuIdentityBackScreen, {

		})
	})
});
