import React from "react";

import { DidiScreen } from "../common/DidiScreen";
import NavigationHeaderStyle from "../common/NavigationHeaderStyle";
import { ServiceSettingsPanel } from "../common/ServiceSettingsPanel";
import DidiButton from "../util/DidiButton";
import NavigationEnabledComponent from "../util/NavigationEnabledComponent";

import { DashboardScreenProps } from "../dashboard/home/Dashboard";
import strings from "../resources/strings";

export type AccessSettingsProps = {};

export interface AccessSettingsNavigation {
	Dashboard: DashboardScreenProps;
}

export class AccessSettingsScreen extends NavigationEnabledComponent<
	AccessSettingsProps,
	{},
	AccessSettingsNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.debug.menu);

	render() {
		return (
			<DidiScreen style={{ width: "100%" }}>
				<DidiButton title="Force Login" onPress={() => this.navigate("Dashboard", {})} />
				<ServiceSettingsPanel onServiceSettingsSaved={() => this.goBack()} />
			</DidiScreen>
		);
	}
}
