import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import React from "react";
import { StatusBar, SafeAreaView, View, Text } from "react-native";
import commonStyles from "../../access/resources/commonStyles";
import themes from "../../resources/themes";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import { didiConnect } from "../../../model/store";
import { ServiceSettings } from "../../../model/data/ServiceSettings";
import TypedObject from "../../../util/TypedObject";
import DidiTextInput from "../../util/DidiTextInput";
import DidiButton from "../../util/DidiButton";

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
					<View style={commonStyles.view.body}>
						{TypedObject.keys(this.props.serviceSettings).map(key => {
							return (
								<DidiTextInput
									key={key}
									description={key}
									placeholder=""
									textInputProps={{
										defaultValue: this.props.serviceSettings[key],
										onChangeText: text => this.setState({ [key]: text })
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
					</View>
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
