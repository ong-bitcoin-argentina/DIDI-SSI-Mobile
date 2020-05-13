import React from "react";
import { View } from "react-native";

import DidiButton from "../../../util/DidiButton";
import DidiTextInput from "../../../util/DidiTextInput";

export interface KeyRecoveryProps {
	createAddress: () => void;
	importAddress: (phrase: string) => void;
}

interface KeyRecoveryState {
	importSeed?: string;
}

export class KeyRecoveryComponent extends React.Component<KeyRecoveryProps, KeyRecoveryState> {
	constructor(props: KeyRecoveryProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<DidiButton title="Crear Identidad" onPress={() => this.props.createAddress()} />
				<View>
					<DidiTextInput
						description="Importar Identidad"
						placeholder="12 palabras"
						textInputProps={{ onChangeText: text => this.setState({ importSeed: text }) }}
					/>
					<DidiButton
						title="Importar"
						onPress={() => {
							if (this.state.importSeed) {
								this.props.importAddress(this.state.importSeed);
							}
						}}
					/>
				</View>
			</View>
		);
	}
}
