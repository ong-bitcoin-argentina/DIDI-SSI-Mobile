import React from "react";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { Fragment } from "react";
import { StatusBar, View, Text, Clipboard, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-navigation";

import { RNUportHDSigner, SeedPhrase, KeyAddress } from "react-native-uport-signer";

import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import DidiTextInput from "../../util/DidiTextInput";

export type UportIdentityProps = {};
interface UportIdentityState {
	seeds?: KeyAddress[];
	importSeed?: SeedPhrase;
	deleteIdentityOnNextTap: boolean;
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
		this.state = {
			deleteIdentityOnNextTap: false
		};
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
						{this.state.seeds ? this.renderWithSeeds(this.state.seeds) : this.renderLoading()}
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private renderLoading() {
		return <Text style={commonStyles.text.emphasis}>Cargando</Text>;
	}

	private renderWithSeeds(seeds: string[]) {
		if (seeds.length === 0) {
			return this.renderEmpty();
		} else {
			const seed = seeds[0];
			return (
				<Fragment>
					<Text style={commonStyles.text.emphasis}>Identidad activa:</Text>
					<Text style={commonStyles.text.normal}>{seed}</Text>
					<DidiButton title="Mostrar Frase de Backup" onPress={() => this.showPhrase(seed)} />
					<DidiButton title="Copiar Frase de Backup" onPress={() => this.copyPhrase(seed)} />
					{this.state.deleteIdentityOnNextTap ? (
						<DidiButton
							style={{ backgroundColor: "red" }}
							title="Eliminar Identidad"
							onPress={() => this.deleteSeed(seed)}
						/>
					) : (
						<DidiButton title="Eliminar Identidad" onPress={() => this.setState({ deleteIdentityOnNextTap: true })} />
					)}
				</Fragment>
			);
		}
	}

	private renderEmpty() {
		return (
			<Fragment>
				<DidiButton title="Crear Identidad" onPress={() => this.createAddress()} />
				<View>
					<DidiTextInput
						description="Importar Identidad"
						placeholder="12 palabras"
						textInputProps={{ onChangeText: text => this.setState({ importSeed: text }) }}
					/>
					<DidiButton
						title="Importar"
						onPress={() => {
							this.importSeed();
						}}
					/>
				</View>
			</Fragment>
		);
	}

	private createAddress() {
		RNUportHDSigner.createSeed("simple").then(() => {
			this.reloadAddresses();
		});
	}

	private showPhrase(seed: KeyAddress) {
		RNUportHDSigner.showSeed(seed, "Reasons").then(phrase => {
			alert(phrase);
		});
	}

	private copyPhrase(seed: KeyAddress) {
		RNUportHDSigner.showSeed(seed, "Reasons").then(phrase => {
			Clipboard.setString(phrase);
			ToastAndroid.show("Copiado", ToastAndroid.SHORT);
		});
	}

	private deleteSeed(seed: KeyAddress) {
		RNUportHDSigner.deleteSeed(seed);
		this.setState({ deleteIdentityOnNextTap: false });
		this.reloadAddresses();
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
