import { StartAccessProps } from "../access/StartAccess";
import { DashboardScreen } from "./Dashboard";
import NavMap, { NavTree } from "../util/NavMap";

interface DashboardSwitchTarget {
	Access: StartAccessProps;
}

export default function(then: NavTree<DashboardSwitchTarget>) {
	return NavMap.from(DashboardScreen, then);
}
