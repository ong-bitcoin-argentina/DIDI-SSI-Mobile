import NavMap, { NavTree } from "../../util/NavMap";
import StartCredentialInteractionScreen from "./StartCredentialInteraction";
import { DashboardScreenProps } from "../home/Dashboard";
import ScanCredentialScreen from "./ScanCredential";
import UportIdentityScreen from "./UportIdentity";
import ScanCredentialToAddScreen from "./ScanCredentialToAdd";
import ScanDisclosureRequestScreen from "./ScanDisclosureRequest";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(StartCredentialInteractionScreen, {
		ScanCredential: NavMap.from(ScanCredentialScreen, {}),
		ScanCredentialToAdd: NavMap.from(ScanCredentialToAddScreen, {}),
		ScanDisclosureRequest: NavMap.from(ScanDisclosureRequestScreen, {}),
		UportIdentity: NavMap.from(UportIdentityScreen, {})
	});
}
