import React from "react";
import { ScrollView, Text } from "react-native";

import TypedObject from "../../util/TypedObject";
import commonStyles from "../resources/commonStyles";
import DidiButton from "../util/DidiButton";
import DidiTextInput from "../util/DidiTextInput";

import { ServiceSettings } from "../../model/ServiceSettings";
import { defaultServiceSettings } from "../../store/reducers/serviceSettingsReducer";
import { didiConnect } from "../../store/store";

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
		return (
			<ScrollView style={{}} contentContainerStyle={{ padding: 30, justifyContent: "flex-start" }}>
				<Text style={[commonStyles.text.emphasis, { marginBottom: 20 }]}>
					Dejar un input vacio y guardar lo retorna a su valor por defecto
				</Text>
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
