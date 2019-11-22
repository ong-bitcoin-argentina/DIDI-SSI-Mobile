import React from "react";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceSettingsPanel } from "../../common/ServiceSettingsPanel";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";

export type ServiceSettingsScreenProps = {};

export class ServiceSettingsScreen extends NavigationEnabledComponent<ServiceSettingsScreenProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.debug.serviceConfig.barTitle);

	render() {
		return (
			<DidiScreen style={{ width: "100%" }}>
				<ServiceSettingsPanel onServiceSettingsSaved={() => this.goBack()} />
			</DidiScreen>
		);
	}
}
