import React from "react";
import { Alert, StyleSheet, Text } from "react-native";

import commonStyles from "../../access/resources/commonStyles";
import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { Identity } from "../../../model/Identity";
import { RequestDocument } from "../../../model/RequestDocument";
import { submitDisclosureResponse } from "../../../services/issuer/submitDisclosureResponse";
import { didiConnect } from "../../../store/store";
import { createDisclosureResponse } from "../../../uPort/createDisclosureResponse";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanDisclosureRequestProps {
	request: RequestDocument;
	onGoBack(screen: ScanDisclosureRequestScreen): void;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	credentials: Array<DerivedCredential<CredentialDocument>>;
	microCredentials: CredentialDocument[];
}
interface ScanDisclosureRequestDispatchProps {
	storeRequest(request: RequestDocument): void;
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps &
	ScanDisclosureRequestStateProps &
	ScanDisclosureRequestDispatchProps;

type ScanDisclosureRequestState = {};
export interface ScanDisclosureRequestNavigation {
	ScanCredential: ScanCredentialProps;
}

class ScanDisclosureRequestScreen extends NavigationEnabledComponent<
	ScanDisclosureRequestInternalProps,
	ScanDisclosureRequestState,
	ScanDisclosureRequestNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle("Credenciales");

	componentDidMount() {
		this.props.storeRequest(this.props.request);
	}

	render() {
		return (
			<DidiScreen style={styles.body}>
				<RequestCard style={{ marginHorizontal: 20 }} request={this.props.request} />
				<Text style={commonStyles.text.normal}>¿Enviar datos?</Text>
				<DidiButton style={styles.button} title="Si" onPress={() => this.answerRequest()} />
				<DidiButton style={styles.button} title="No" onPress={() => this.props.onGoBack(this)} />
			</DidiScreen>
		);
	}

	private async answerRequest() {
		try {
			const { accessToken, missing } = await createDisclosureResponse({
				request: this.props.request,
				identity: this.props.identity,
				microCredentials: this.props.microCredentials
			});
			try {
				const success = await submitDisclosureResponse(this.props.request.content.callback, accessToken);

				if (!success) {
					Alert.alert("Respuesta rechazada por servidor");
				} else if (missing.length > 0) {
					Alert.alert("Respuesta enviada", `Puede ocurrir un error por falta de credenciales: ${missing.join(", ")}`);
				} else {
					Alert.alert("Respuesta enviada");
				}

				this.props.onGoBack(this);
			} catch (e) {
				Alert.alert("Error en la conexion", JSON.stringify(e));
			}
		} catch (e) {
			Alert.alert("Error al generar respuesta", JSON.stringify(e));
		}
	}
}

export default didiConnect(
	ScanDisclosureRequestScreen,
	(state): ScanDisclosureRequestStateProps => {
		return {
			identity: state.identity,
			credentials: state.credentials,
			microCredentials: state.microCredentials
		};
	},
	(dispatch): ScanDisclosureRequestDispatchProps => {
		return {
			storeRequest: (request: RequestDocument) => dispatch({ type: "TOKEN_ENSURE", content: [request.jwt] })
		};
	}
);

const styles = StyleSheet.create({
	body: {
		width: "100%"
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
