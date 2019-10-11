import React from "react";
import { Fragment } from "react";
import { StatusBar, View, Modal, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import themes from "../../resources/themes";
import commonStyles from "../../access/resources/commonStyles";
import NavigationHeaderStyle from "../../resources/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { UPortDocument } from "../../../model/data/UPortDocument";
import { SelectiveDisclosureRequest } from "../../../uPort/types/SelectiveDisclosureRequest";
import { StoreContent } from "../../../model/store";
import { Identity } from "../../../model/data/Identity";
import { ScanCredentialProps } from "./ScanCredential";
import { createDisclosureResponse } from "../../../uPort/createDisclosureResponse";
import { submitDisclosureResponse } from "../../../services/issuer/submitDisclosureResponse";

export interface ScanDisclosureRequestProps {
	request: SelectiveDisclosureRequest;
	requestJWT: string;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	documents: UPortDocument[];
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps & ScanDisclosureRequestStateProps;

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

	render() {
		return (
			<Fragment>
				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />
				<SafeAreaView style={commonStyles.view.area}>
					<View style={styles.body}>
						<Text>{JSON.stringify(this.props.request)}</Text>
						<Text style={commonStyles.text.normal}>¿Enviar datos?</Text>
						<DidiButton style={styles.button} title="Si" onPress={() => this.answerRequest()} />
						<DidiButton style={styles.button} title="No" onPress={() => this.replace("ScanCredential", {})} />
					</View>
				</SafeAreaView>
			</Fragment>
		);
	}

	private async answerRequest() {
		try {
			const { accessToken, missing } = await createDisclosureResponse(this.props);
			try {
				const success = await submitDisclosureResponse(this.props.request.callback, accessToken);

				if (!success) {
					alert("Respuesta rechazada por servidor");
				} else if (missing.length > 0) {
					alert(`Respuesta enviada. Puede ocurrir un error por falta de credenciales: ${missing.join(", ")}`);
				} else {
					alert("Respuesta enviada");
				}

				this.replace("ScanCredential", {});
			} catch (e) {
				alert(`Error en la conexion: ${e}`);
			}
		} catch (e) {
			alert(`Error al generar respuesta: ${e}`);
		}
	}
}

export default connect(
	(state: StoreContent): ScanDisclosureRequestStateProps => {
		return {
			identity: state.identity,
			documents: state.documents
		};
	}
)(ScanDisclosureRequestScreen);

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
