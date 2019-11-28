import React from "react";
import { Alert, Clipboard, Text, ToastAndroid, View, ViewProps } from "react-native";
import { KeyAddress, RNUportHDSigner } from "react-native-uport-signer";

import DidiButton from "../../../util/DidiButton";
import { DidiText } from "../../../util/DidiText";

export interface KeyDisplayProps extends ViewProps {
	seed: KeyAddress;
	onSeedDeleted: () => void;
}
interface KeyDisplayState {
	deleteIdentityOnNextTap: boolean;
}

export class KeyDisplayComponent extends React.Component<KeyDisplayProps, KeyDisplayState> {
	constructor(props: KeyDisplayProps) {
		super(props);
		this.state = {
			deleteIdentityOnNextTap: false
		};
	}

	render() {
		const seed = this.props.seed;
		return (
			<View {...this.props}>
				<DidiText.Explanation.Emphasis>Identidad activa (DID):</DidiText.Explanation.Emphasis>
				<DidiText.Explanation.Normal>{seed}</DidiText.Explanation.Normal>
				<DidiButton title="Copiar DID" onPress={() => this.copyDID(seed)} />
				<DidiButton title="Mostrar Frase de Respaldo" onPress={() => this.showPhrase(seed)} />
				<DidiButton title="Copiar Frase de Respaldo" onPress={() => this.copyPhrase(seed)} />
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

	private copyDID(seed: KeyAddress) {
		Clipboard.setString(seed);
		ToastAndroid.show("Copiado", ToastAndroid.SHORT);
	}

	private showPhrase(seed: KeyAddress) {
		RNUportHDSigner.showSeed(seed, "Reasons").then(phrase => {
			Alert.alert("Frase de Respaldo", phrase);
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
