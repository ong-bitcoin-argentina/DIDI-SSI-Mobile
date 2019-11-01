import React, { Fragment } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";

import TypedObject from "../../../util/TypedObject";
import commonStyles from "../../access/resources/commonStyles";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { ServiceSettings } from "../../../model/ServiceSettings";
import { defaultServiceSettings } from "../../../store/reducers/serviceSettingsReducer";
import { didiConnect } from "../../../store/store";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import themes from "../../resources/themes";

export type ServiceSettingsScreenProps = {};
interface ServiceSettingsScreenStateProps {
	serviceSettings: ServiceSettings;
}
interface ServiceSettingsScreenDispatchProps {
	setServiceSettings(value: ServiceSettings): void;
}
type ServiceSettingsScreenInternalProps = ServiceSettingsScreenProps &
	ServiceSettingsScreenStateProps &
	ServiceSettingsScreenDispatchProps;

type ServiceSettingsScreenState = Partial<ServiceSettings>;
export type ServiceSettingsScreenNavigation = {};

const displayNames: { [K in keyof ServiceSettings]: string } = {
	ethrDidUri: "ethr-did-resolver URI",
	sharePrefix: "Share URI Prefix",
	trustGraphUri: "TrustGraph (Mouro) URI",
	didiUserServer: "Didi server (Registration)"
};

class ServiceSettingsScreen extends NavigationEnabledComponent<
	ServiceSettingsScreenInternalProps,
	ServiceSettingsScreenState,
	ServiceSettingsScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Acerca de Didi");

	constructor(props: ServiceSettingsScreenInternalProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
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
								this.goBack();
							}}
						/>
					</ScrollView>
				</SafeAreaView>
			</Fragment>
		);
	}
}

const connected = didiConnect(
	ServiceSettingsScreen,
	(state): ServiceSettingsScreenStateProps => {
		return {
			serviceSettings: state.serviceSettings
		};
	},
	(dispatch): ServiceSettingsScreenDispatchProps => {
		return {
			setServiceSettings: (value: ServiceSettings) => dispatch({ type: "SERVICE_SETTINGS_SET", value })
		};
	}
);

export { connected as ServiceSettingsScreen };
