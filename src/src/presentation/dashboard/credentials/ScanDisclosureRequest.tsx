import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { CredentialDocument } from "../../../model/data/CredentialDocument";
import { didiConnect } from "../../../model/store";
import { Identity } from "../../../model/data/Identity";
import { ScanCredentialProps } from "./ScanCredential";
import { createDisclosureResponse } from "../../../uPort/createDisclosureResponse";
import { submitDisclosureResponse } from "../../../services/issuer/submitDisclosureResponse";
import { RequestDocument } from "../../../model/data/RequestDocument";
import { RequestCard } from "../common/RequestCard";

export interface ScanDisclosureRequestProps {
	request: RequestDocument;
	onGoBack(screen: ScanDisclosureRequestScreen): void;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	credentials: CredentialDocument[];
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
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						<RequestCard style={{ marginHorizontal: 20 }} request={this.props.request} />
						<Text style={commonStyles.text.normal}>¿Enviar datos?</Text>
						<DidiButton style={styles.button} title="Si" onPress={() => this.answerRequest()} />
						<DidiButton style={styles.button} title="No" onPress={() => this.props.onGoBack(this)} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private async answerRequest() {
		try {
			const { accessToken, missing } = await createDisclosureResponse(this.props);
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
			credentials: state.credentials
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
		width: "100%",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		flex: 1
	},
	button: {
		width: "80%",
		alignSelf: "center"
	}
});
