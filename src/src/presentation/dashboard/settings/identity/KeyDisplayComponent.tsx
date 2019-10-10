import React from "react";
import { View, Text, Clipboard, ToastAndroid } from "react-native";

import { RNUportHDSigner, KeyAddress } from "react-native-uport-signer";

import commonStyles from "../../../access/resources/commonStyles";
import DidiButton from "../../../util/DidiButton";

export interface KeyDisplayProps {
	seed: KeyAddress;
	onSeedDeleted: () => void;
}
interface KeyDisplayState {
	deleteIdentityOnNextTap: boolean;
}

export default class KeyDisplayComponent extends React.Component<KeyDisplayProps, KeyDisplayState> {
	constructor(props: KeyDisplayProps) {
		super(props);
		this.state = {
			deleteIdentityOnNextTap: false
		};
	}

	render() {
		const seed = this.props.seed;
		return (
			<View>
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
			</View>
		);
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
		this.props.onSeedDeleted();
	}
}
