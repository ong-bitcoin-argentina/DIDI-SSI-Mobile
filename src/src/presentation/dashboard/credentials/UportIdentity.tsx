import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Text, Alert, TouchableOpacity, ListView } from "react-native";
import { SafeAreaView, FlatList } from "react-navigation";

import { RNUportHDSigner, SeedPhrase, KeyAddress } from "react-native-uport-signer";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import DidiQRScanner from "../common/DidiQRScanner";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";

export type UportIdentityProps = {};
interface UportIdentityState {
	seeds?: KeyAddress[];
	importSeed?: SeedPhrase;
}
export interface UportIdentityNavigation {}

export default class UportIdentityScreen extends NavigationEnabledComponent<
	UportIdentityProps,
	UportIdentityState,
	UportIdentityNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	constructor(props: UportIdentityProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.reloadAddresses();
	}

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={commonStyles.view.body}>
						<DidiButton title="Create Seed" onPress={() => this.createAddress()} />
						<DidiTextInput
							description="Import Seed"
							placeholder="12 words"
							textInputProps={{ onChangeText: text => this.setState({ importSeed: text }) }}
						/>
						<DidiButton
							title="Import"
							onPress={() => {
								this.importSeed();
							}}
						/>
						{this.renderSeeds()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderSeeds() {
		if (this.state.seeds) {
			return (
				<FlatList
					data={this.state.seeds}
					numColumns={1}
					keyExtractor={seed => seed}
					renderItem={({ item }) => this.renderSeed(item)}
				/>
			);
		} else {
			return <Text style={{ flex: 1 }}>Loading</Text>;
		}
	}

	private renderSeed(seed: KeyAddress) {
		return (
			<TouchableOpacity
				style={{ margin: 10 }}
				onPress={() => {
					this.showSeed(seed);
				}}
			>
				<Text>{seed}</Text>
			</TouchableOpacity>
		);
	}

	private createAddress() {
		RNUportHDSigner.createSeed("simple").then(() => {
			this.reloadAddresses();
		});
	}

	private showSeed(seed: KeyAddress) {
		RNUportHDSigner.showSeed(seed, "Reasons").then(phrase => {
			alert(phrase);
		});
	}

	private importSeed() {
		if (this.state.importSeed) {
			RNUportHDSigner.importSeed(this.state.importSeed, "simple").then(() => {
				this.reloadAddresses();
			});
		}
	}

	private reloadAddresses() {
		RNUportHDSigner.listSeedAddresses().then(seeds => {
			this.setState({ seeds });
		});
	}
}
