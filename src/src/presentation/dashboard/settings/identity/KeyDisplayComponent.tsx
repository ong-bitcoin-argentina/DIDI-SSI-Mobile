import React from "react";
import { Alert, Clipboard, ToastAndroid, View, ViewProps } from "react-native";
import { KeyAddress, RNUportHDSigner } from "react-native-uport-signer";

import DidiButton from "../../../util/DidiButton";

export interface KeyDisplayProps extends ViewProps {
	seed: KeyAddress;
	deleteSeed: () => void;
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
				<DidiButton title="Mostrar Frase de Respaldo" onPress={() => this.showPhrase(seed)} />
				<DidiButton title="Copiar Frase de Respaldo" onPress={() => this.copyPhrase(seed)} />
				{this.state.deleteIdentityOnNextTap ? (
					<DidiButton
						style={{ backgroundColor: "red" }}
						title="Eliminar Identidad"
						onPress={() => this.deleteSeed()}
					/>
				) : (
					<DidiButton title="Eliminar Identidad" onPress={() => this.setState({ deleteIdentityOnNextTap: true })} />
				)}
			</View>
		);
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

	private deleteSeed() {
		this.props.deleteSeed();
		this.setState({ deleteIdentityOnNextTap: false });
	}
}
