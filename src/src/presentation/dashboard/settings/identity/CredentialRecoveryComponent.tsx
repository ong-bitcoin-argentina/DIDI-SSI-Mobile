import React from "react";
import { Text, View, ViewProps } from "react-native";

import commonStyles from "../../../resources/commonStyles";
import DidiButton from "../../../util/DidiButton";
import { DidiText } from "../../../util/DidiText";

import { recoverTokens } from "../../../../services/trustGraph/recoverTokens";
import { didiConnect } from "../../../../store/store";

export type CredentialRecoveryProps = ViewProps;
interface CredentialRecoveryStateProps {
	tokens: string[];
	trustGraphUri: string;
	ethrDidUri: string;
}
interface CredentialRecoveryDispatchProps {
	recoverTokens: () => void;
	deleteAllTokens: () => void;
	deleteDidDni: () => void;
}
type CredentialRecoveryInternalProps = CredentialRecoveryProps &
	CredentialRecoveryStateProps &
	CredentialRecoveryDispatchProps;

class CredentialRecoveryComponent extends React.Component<CredentialRecoveryInternalProps> {
	handleDeleteLocalData = () => {
		this.props.deleteAllTokens();
		this.props.deleteDidDni();
	};

	render() {
		return (
			<View {...this.props}>
				<DidiText.Explanation.Normal>
					<DidiText.Explanation.Emphasis>Credenciales Locales: </DidiText.Explanation.Emphasis>
					{this.props.tokens.length}
				</DidiText.Explanation.Normal>

				<DidiButton title="Borrar Credenciales Locales" onPress={this.handleDeleteLocalData} />
				<DidiButton title="Cargar Credenciales Remotas" onPress={() => this.props.recoverTokens()} />
			</View>
		);
	}
}

const connected = didiConnect(
	CredentialRecoveryComponent,
	(store): CredentialRecoveryStateProps => {
		return {
			tokens: store.tokens,
			trustGraphUri: store.serviceSettings.trustGraphUri,
			ethrDidUri: store.serviceSettings.ethrDidUri
		};
	},
	(dispatch): CredentialRecoveryDispatchProps => {
		return {
			recoverTokens: () => dispatch(recoverTokens()),
			deleteAllTokens: () => dispatch({ type: "TOKEN_DELETE_ALL" }),
			deleteDidDni: () => dispatch({ type: "RESET_DID_DNI" })
		};
	}
);

export { connected as CredentialRecoveryComponent };
