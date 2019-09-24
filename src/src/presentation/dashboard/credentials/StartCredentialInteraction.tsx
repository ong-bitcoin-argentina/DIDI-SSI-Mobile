import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { ScanCredentialProps } from "./ScanCredential";

export type StartCredentialInteractionProps = {};
type StartCredentialInteractionState = {};
export interface StartCredentialInteractionNavigation {
	ScanCredential: ScanCredentialProps;
}

export default class StartCredentialInteractionScreen extends NavigationEnabledComponent<
	StartCredentialInteractionProps,
	StartCredentialInteractionState,
	StartCredentialInteractionNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<DidiButton title="Escanear Credencial" onPress={() => this.navigate("ScanCredential", {})} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}
}
