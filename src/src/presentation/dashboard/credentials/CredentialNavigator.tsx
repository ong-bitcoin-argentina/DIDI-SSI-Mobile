import NavMap, { NavTree } from "../../util/NavMap";
import StartCredentialInteractionScreen from "./StartCredentialInteraction";
import { DashboardScreenProps } from "../home/Dashboard";
import ScanCredentialScreen from "./ScanCredential";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(StartCredentialInteractionScreen, {
		ScanCredential: NavMap.from(ScanCredentialScreen, {})
	});
}
