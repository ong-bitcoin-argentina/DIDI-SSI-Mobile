import React from "react";

import { DidiScreen } from "../common/DidiScreen";
import { ServiceSettingsPanel } from "../common/ServiceSettingsPanel";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../resources/NavigationHeaderStyle";

export type AccessSettingsProps = {};

export class AccessSettingsScreen extends NavigationEnabledComponent<AccessSettingsProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Debug Menu");

	render() {
		return (
			<DidiScreen style={{ width: "100%" }}>
				<ServiceSettingsPanel onServiceSettingsSaved={() => this.goBack()} />
			</DidiScreen>
		);
	}
}
