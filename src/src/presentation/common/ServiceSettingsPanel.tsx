import React from "react";
import { ScrollView, Text } from "react-native";

import TypedObject from "../../util/TypedObject";
import DidiButton from "../util/DidiButton";
import { DidiText } from "../util/DidiText";
import DidiTextInput from "../util/DidiTextInput";

import { AppConfig } from "../../AppConfig";
import { ServiceSettings } from "../../model/ServiceSettings";
import { didiConnect } from "../../store/store";
import strings from "../resources/strings";

export interface ServiceSettingsPanelProps {
	onServiceSettingsSaved(): void;
}
interface ServiceSettingsPanelStateProps {
	serviceSettings: ServiceSettings;
}
interface ServiceSettingsPanelDispatchProps {
	setServiceSettings(value: ServiceSettings): void;
}
type ServiceSettingsInternalProps = ServiceSettingsPanelProps &
	ServiceSettingsPanelStateProps &
	ServiceSettingsPanelDispatchProps;

type ServiceSettingsPanelState = Partial<ServiceSettings>;

const displayNames: { [K in keyof ServiceSettings]: string } = {
	ethrDidUri: "ethr-did-resolver URI",
	sharePrefix: "Share URI Prefix",
	trustGraphUri: "TrustGraph (Mouro) URI",
	didiUserServer: "Didi server (Registration)"
};

class ServiceSettingsPanel extends React.Component<ServiceSettingsInternalProps, ServiceSettingsPanelState> {
	render() {
		const defaultServiceSettings = AppConfig.defaultServiceSettings;
		return (
			<ScrollView style={{}} contentContainerStyle={{ padding: 30, justifyContent: "flex-start" }}>
				<DidiText.Explanation.Emphasis style={{ marginBottom: 20 }}>
					{strings.debug.serviceConfig.instructions}
				</DidiText.Explanation.Emphasis>
				{TypedObject.keys(this.props.serviceSettings).map(key => {
					const description = `${displayNames[key]}\nDefault: ${defaultServiceSettings[key]}\nActual: ${this.props.serviceSettings[key]}`;
					return (
						<DidiTextInput
							key={key}
							description={description}
							placeholder={defaultServiceSettings[key]}
							textInputProps={{
								defaultValue: this.props.serviceSettings[key],
								onChangeText: text => this.setState({ [key]: text ? text : defaultServiceSettings[key] })
							}}
						/>
					);
				})}
				<DidiButton
					title="Guardar"
					onPress={() => {
						this.props.setServiceSettings({ ...this.props.serviceSettings, ...this.state });
						this.props.onServiceSettingsSaved();
					}}
				/>
			</ScrollView>
		);
	}
}

const connected = didiConnect(
	ServiceSettingsPanel,
	(state): ServiceSettingsPanelStateProps => {
		return {
			serviceSettings: state.serviceSettings
		};
	},
	(dispatch): ServiceSettingsPanelDispatchProps => {
		return {
			setServiceSettings: (value: ServiceSettings) => dispatch({ type: "SERVICE_SETTINGS_SET", value })
		};
	}
);

export { connected as ServiceSettingsPanel };
