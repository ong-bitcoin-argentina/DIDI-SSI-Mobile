import React from "react";
import { View, ViewProps } from "react-native";

import { RNUportHDSigner, SeedPhrase } from "react-native-uport-signer";

import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";

export interface KeyRecoveryProps extends ViewProps {
	onSeedCreated: () => void;
}
interface KeyRecoveryState {
	importSeed?: SeedPhrase;
}

export class KeyRecoveryComponent extends React.Component<KeyRecoveryProps, KeyRecoveryState> {
	constructor(props: KeyRecoveryProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View {...this.props}>
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
			</View>
		);
	}

	private createAddress() {
		RNUportHDSigner.createSeed("simple").then(() => {
			this.props.onSeedCreated();
		});
	}

	private importSeed() {
		if (this.state.importSeed) {
			RNUportHDSigner.importSeed(this.state.importSeed, "simple").then(() => {
				this.props.onSeedCreated();
			});
		}
	}
}
