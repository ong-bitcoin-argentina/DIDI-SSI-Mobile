import NavMap from "../../util/NavMap";

import { ScanCredentialScreen } from "./ScanCredential";
import { ScanCredentialToAddScreen } from "./ScanCredentialToAdd";
import ScanDisclosureRequestScreen from "./ScanDisclosureRequest";
import { ScanDisclosureResponseScreen } from "./ScanDisclosureResponse";
import { ShowDisclosureRequestScreen } from "./ShowDisclosureRequest";
import { ShowDisclosureResponseScreen } from "./ShowDisclosureResponse";

export default NavMap.from(ScanCredentialScreen, {
	ScanCredentialToAdd: NavMap.from(ScanCredentialToAddScreen, {
		ScanCredential: NavMap.placeholder(ScanCredentialScreen)
	}),
	ScanDisclosureRequest: NavMap.from(ScanDisclosureRequestScreen, {
		ScanCredential: NavMap.placeholder(ScanCredentialScreen),
		ShowDisclosureResponse: NavMap.from(ShowDisclosureResponseScreen, {})
	}),
	ShowDisclosureRequest: NavMap.from(ShowDisclosureRequestScreen, {
		ScanDisclosureResponse: NavMap.from(ScanDisclosureResponseScreen, {
			ScanCredentialToAdd: NavMap.placeholder(ScanCredentialToAddScreen)
		})
	})
});
