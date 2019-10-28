import { isLeft } from "fp-ts/lib/Either";
import React, { Fragment } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

import { ServiceState } from "../../../services/common/ServiceState";
import commonStyles from "../../access/resources/commonStyles";
import { DidiScreen } from "../../common/DidiScreen";
import DidiButton from "../../util/DidiButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { Identity } from "../../../model/Identity";
import { RequestDocument } from "../../../model/RequestDocument";
import { SubmitDisclosureResponseArguments } from "../../../services/issuer/submitDisclosureResponse";
import { didiConnect } from "../../../store/store";
import { createDisclosureResponse } from "../../../uPort/createDisclosureResponse";
import { unverifiedParseJWT } from "../../../uPort/parseJWT";
import colors from "../../resources/colors";
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
	responseState: ServiceState<SubmitDisclosureResponseArguments, boolean, string>;
}
interface ScanDisclosureRequestDispatchProps {
	sendResponse(callback: string, accessToken: string): void;
	resetResponse(): void;
	storeRequest(request: RequestDocument): void;
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps &
	ScanDisclosureRequestStateProps &
	ScanDisclosureRequestDispatchProps;

export interface ScanDisclosureRequestNavigation {
	ScanCredential: ScanCredentialProps;
}

class ScanDisclosureRequestScreen extends NavigationEnabledComponent<
	ScanDisclosureRequestInternalProps,
	{},
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
				{this.renderButtons()}
			</DidiScreen>
		);
	}

	private renderButtons() {
		switch (this.props.responseState.state) {
			case "NONE":
				return (
					<View style={styles.buttonContainer}>
						<Text style={commonStyles.text.normal}>¿Enviar datos?</Text>
						<DidiButton style={styles.button} title="Si" onPress={() => this.answerRequest()} />
						<DidiButton style={styles.button} title="No" onPress={() => this.props.onGoBack(this)} />
					</View>
				);
			case "PENDING":
				return (
					<View style={styles.buttonContainer}>
						<ActivityIndicator size="large" color={colors.secondary} />
						<Text style={commonStyles.text.normal}>Enviando</Text>
					</View>
				);
			case "FAILURE":
				return (
					<View style={styles.buttonContainer}>
						<Text style={commonStyles.text.normal}>Error en la conexion</Text>
						<DidiButton style={styles.button} title="Reenviar" onPress={() => this.answerRequest()} />
						<DidiButton style={styles.button} title="Regresar" onPress={() => this.props.onGoBack(this)} />
					</View>
				);
			case "SUCCESS":
				return undefined;
		}
	}

	componentDidUpdate() {
		const response = this.props.responseState;
		switch (response.state) {
			case "NONE":
			case "PENDING":
			case "FAILURE":
				return;
			case "SUCCESS":
				if (response.value) {
					Alert.alert("Respuesta enviada");
					this.props.resetResponse();
					this.props.onGoBack(this);
				} else {
					Alert.alert("Respuesta rechazada por servidor");
				}
				return;
		}
	}

	private async answerRequest() {
		try {
			const { accessToken, missing } = await createDisclosureResponse({
				request: this.props.request,
				identity: this.props.identity,
				microCredentials: this.props.microCredentials
			});
			this.props.sendResponse(this.props.request.content.callback, accessToken);
		} catch (e) {
			Alert.alert("Error al generar respuesta", JSON.stringify(e));
			return;
		}
	}
}

export default didiConnect(
	ScanDisclosureRequestScreen,
	(state): ScanDisclosureRequestStateProps => {
		return {
			identity: state.identity,
			credentials: state.credentials,
			microCredentials: state.microCredentials,
			responseState: state.serviceCalls.submitDisclosureResponse
		};
	},
	(dispatch): ScanDisclosureRequestDispatchProps => {
		return {
			sendResponse: (callback: string, accessToken: string) =>
				dispatch({
					type: "SERVICE_DISCLOSURE_RESPONSE",
					serviceAction: { type: "START", args: { callback, accessToken } }
				}),
			resetResponse: () =>
				dispatch({
					type: "SERVICE_DISCLOSURE_RESPONSE",
					serviceAction: { type: "DROP" }
				}),
			storeRequest: (request: RequestDocument) => dispatch({ type: "TOKEN_ENSURE", content: [request.jwt] })
		};
	}
);

const styles = StyleSheet.create({
	body: {
		width: "100%",
		justifyContent: "flex-start"
	},
	button: {
		width: "80%",
		alignSelf: "center"
	},
	buttonContainer: {
		justifyContent: "space-around"
	}
});
