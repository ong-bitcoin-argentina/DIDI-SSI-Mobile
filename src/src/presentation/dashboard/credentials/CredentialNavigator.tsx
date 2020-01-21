import NavMap, { NavTree } from "../../util/NavMap";

import { DashboardScreenProps } from "../home/Dashboard";

import { ScanCredentialScreen } from "./ScanCredential";
import { ScanCredentialToAddScreen } from "./ScanCredentialToAdd";
import ScanDisclosureRequestScreen from "./ScanDisclosureRequest";
import { ShowDisclosureResponseScreen } from "./ShowDisclosureResponse";

export default function(then: NavTree<DashboardScreenProps>) {
	return NavMap.from(ScanCredentialScreen, {
		ScanCredentialToAdd: NavMap.from(ScanCredentialToAddScreen, {
			ScanCredential: NavMap.placeholder(ScanCredentialScreen)
		}),
		ScanDisclosureRequest: NavMap.from(ScanDisclosureRequestScreen, {
			ScanCredential: NavMap.placeholder(ScanCredentialScreen),
			ShowDisclosureResponse: NavMap.from(ShowDisclosureResponseScreen, {})
		})
	});
}
