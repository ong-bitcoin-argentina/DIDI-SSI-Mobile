import React from "react";

import { DidiScreen } from "../../common/DidiScreen";
import { ServiceSettingsPanel } from "../../common/ServiceSettingsPanel";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";

export type ServiceSettingsScreenProps = {};

export class ServiceSettingsScreen extends NavigationEnabledComponent<ServiceSettingsScreenProps, {}, {}> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Didi");

	render() {
		return (
			<DidiScreen style={{ width: "100%" }}>
				<ServiceSettingsPanel onServiceSettingsSaved={() => this.goBack()} />
			</DidiScreen>
		);
	}
}
