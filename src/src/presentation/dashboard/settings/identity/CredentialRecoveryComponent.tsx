import React from "react";
import { Text, View, ViewProps } from "react-native";

import commonStyles from "../../../access/resources/commonStyles";
import { ServiceObserver } from "../../../common/ServiceObserver";
import DidiButton from "../../../util/DidiButton";

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
}
type CredentialRecoveryInternalProps = CredentialRecoveryProps &
	CredentialRecoveryStateProps &
	CredentialRecoveryDispatchProps;

const serviceKey = "CredentialRecoveryComponent";

class CredentialRecoveryComponent extends React.Component<CredentialRecoveryInternalProps> {
	render() {
		return (
			<View {...this.props}>
				<Text style={commonStyles.text.normal}>
					<Text style={commonStyles.text.emphasis}>Credenciales Locales: </Text>
					{this.props.tokens.length}
				</Text>

				<DidiButton title="Borrar Credenciales Locales" onPress={() => this.props.deleteAllTokens()} />
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
			recoverTokens: () => dispatch(recoverTokens(serviceKey)),
			deleteAllTokens: () => dispatch({ type: "TOKEN_DELETE_ALL" })
		};
	}
);

export { connected as CredentialRecoveryComponent };
