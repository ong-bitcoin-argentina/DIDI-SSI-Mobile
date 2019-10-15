import React from "react";
import { View, Text, ViewProps } from "react-native";
import { isRight } from "fp-ts/lib/Either";

import { didiConnect } from "../../../../model/store";
import parseJWT from "../../../../uPort/parseJWT";
import { TrustGraphClient } from "../../../../uPort/TrustGraphClient";
import TypedArray from "../../../../util/TypedArray";
import DidiButton from "../../../util/DidiButton";
import commonStyles from "../../../access/resources/commonStyles";

export type CredentialRecoveryProps = ViewProps;
interface CredentialRecoveryStateProps {
	tokens: string[];
}
interface CredentialRecoveryDispatchProps {
	recoverTokens(tokens: string[]): void;
	deleteAllTokens(): void;
}
type CredentialRecoveryInternalProps = CredentialRecoveryProps &
	CredentialRecoveryStateProps &
	CredentialRecoveryDispatchProps;

interface CredentialRecoverState {
	tokens?: string[];
}

class CredentialRecoveryComponent extends React.Component<CredentialRecoveryInternalProps, CredentialRecoverState> {
	constructor(props: CredentialRecoveryInternalProps) {
		super(props);
		this.state = {};
	}

	render() {
		const currentDocs = this.state.tokens || [];
		return (
			<View {...this.props}>
				<Text style={commonStyles.text.normal}>
					<Text style={commonStyles.text.emphasis}>Credenciales Locales: </Text>
					{this.props.tokens.length}
				</Text>

				<Text style={commonStyles.text.normal}>
					<Text style={commonStyles.text.emphasis}>Credenciales Remotas: </Text>
					{this.state.tokens === undefined ? "Sin Cargar" : this.state.tokens.length}
				</Text>

				<DidiButton title="Borrar Credenciales Locales" onPress={() => this.props.deleteAllTokens()} />
				<DidiButton title="Cargar Credenciales Remotas" onPress={() => this.loadRemoteDocs()} />
				{currentDocs.length > 0 && (
					<DidiButton title="Importar Credenciales Remotas" onPress={() => this.addToLocalDocs(currentDocs)} />
				)}
			</View>
		);
	}

	private async loadRemoteDocs() {
		const tg = await TrustGraphClient.create();
		const tokens = await tg.getJWTs();
		this.setState({ tokens });
	}

	private async addToLocalDocs(received: string[]) {
		const acceptToken = async (token: string): Promise<string | undefined> => {
			if (this.props.tokens.includes(token) || isRight(await parseJWT(token))) {
				return token;
			} else {
				return undefined;
			}
		};

		const verifiedTokens = TypedArray.flatMap(await Promise.all(received.map(acceptToken)), x => x);
		this.props.recoverTokens(verifiedTokens);
	}
}

const connected = didiConnect(
	CredentialRecoveryComponent,
	(store): CredentialRecoveryStateProps => {
		return {
			tokens: store.tokens
		};
	},
	(dispatch): CredentialRecoveryDispatchProps => {
		return {
			recoverTokens: (docs: string[]) => dispatch({ type: "TOKEN_ENSURE", content: docs }),
			deleteAllTokens: () => dispatch({ type: "TOKEN_DELETE_ALL" })
		};
	}
);

export { connected as CredentialRecoveryComponent };