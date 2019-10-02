import NavMap, { NavTree } from "../../util/NavMap";
import { DashboardScreenProps } from "../home/Dashboard";
import ScanCredentialScreen from "./ScanCredential";
import ScanCredentialToAddScreen from "./ScanCredentialToAdd";
import ScanDisclosureRequestScreen from "./ScanDisclosureRequest";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(ScanCredentialScreen, {
		ScanCredentialToAdd: NavMap.from(ScanCredentialToAddScreen, {}),
		ScanDisclosureRequest: NavMap.from(ScanDisclosureRequestScreen, {})
	});
}
