import React, { Fragment } from "react";
import { StatusBar, Text, View } from "react-native";
import { RNUportHDSigner } from "react-native-uport-signer";
import { SafeAreaView } from "react-navigation";

import commonStyles from "../../../resources/commonStyles";
import { DidiScreen } from "../../../common/DidiScreen";
import NavigationEnabledComponent from "../../../util/NavigationEnabledComponent";

import NavigationHeaderStyle from "../../../resources/NavigationHeaderStyle";
import themes from "../../../resources/themes";

import { CredentialRecoveryComponent } from "./CredentialRecoveryComponent";
import { KeyDisplayComponent } from "./KeyDisplayComponent";
import { KeyRecoveryComponent } from "./KeyRecoveryComponent";

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
		return <DidiScreen style={{ flexDirection: "row" }}>{this.renderContent()}</DidiScreen>;
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
