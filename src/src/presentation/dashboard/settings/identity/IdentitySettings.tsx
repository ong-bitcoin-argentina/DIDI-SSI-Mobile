import React from "react";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";

import { RNUportHDSigner } from "react-native-uport-signer";

import themes from "../../../resources/themes";
import commonStyles from "../../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import { KeyRecoveryComponent } from "./KeyRecoveryComponent";
import { KeyDisplayComponent } from "./KeyDisplayComponent";
import { CredentialRecoveryComponent } from "./CredentialRecoveryComponent";

export type IdentitySettingsProps = {};
interface IdentitySettingsState {
	seeds?: string[];
}
export type IdentitySettingsNavigation = {};

export default class IdentitySettingsScreen extends NavigationEnabledComponent<
	IdentitySettingsProps,
	IdentitySettingsState,
	IdentitySettingsNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Copia de Seguridad");

	constructor(props: IdentitySettingsProps) {
		super(props);
		this.state = {};
		this.reloadSeeds();
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>{this.renderContent()}</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderContent() {
		if (this.state.seeds === undefined) {
			return <Text style={commonStyles.text.emphasis}>Cargando</Text>;
		} else if (this.state.seeds.length === 0) {
			return <KeyRecoveryComponent onSeedCreated={() => this.reloadSeeds()} />;
		} else {
			return (
				<Fragment>
					<KeyDisplayComponent
						style={{ flex: 1 }}
						seed={this.state.seeds[0]}
						onSeedDeleted={() => this.reloadSeeds()}
					/>
					<CredentialRecoveryComponent style={{ flex: 1 }} />
				</Fragment>
			);
		}
	}

	private reloadSeeds() {
		RNUportHDSigner.listSeedAddresses().then(seeds => {
			this.setState({ seeds });
		});
	}
}
