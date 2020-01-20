import { CredentialDocument, DisclosureResponseContent, getResponseClaims, Identity, RequestDocument } from "didi-sdk";
import React from "react";
import { Alert, StyleSheet } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { submitDisclosureResponse } from "../../../services/issuer/submitDisclosureResponse";
import { isPendingService } from "../../../services/ServiceStateStore";
import { didiConnect } from "../../../store/store";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanDisclosureRequestProps {
	request: RequestDocument;
	onGoBack(screen: ScanDisclosureRequestScreen): void;
}
interface ScanDisclosureRequestStateProps {
	identity: Identity;
	credentials: CredentialDocument[];

	sendDisclosureResponsePending: boolean;
}
interface ScanDisclosureRequestDispatchProps {
	sendResponse: (args: DisclosureResponseContent) => void;
	storeRequest: (request: RequestDocument) => void;
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps &
	ScanDisclosureRequestStateProps &
	ScanDisclosureRequestDispatchProps;

export interface ScanDisclosureRequestNavigation {
	ScanCredential: ScanCredentialProps;
}

const serviceKey = "ScanDisclosureRequest";

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
				<ServiceObserver serviceKey="ScanDisclosureRequest" onSuccess={() => this.onSuccess()} />
				<DidiServiceButton
					onPress={() => this.answerRequest()}
					title="Enviar datos"
					isPending={this.props.sendDisclosureResponsePending}
				/>
			</DidiScreen>
		);
	}

	private answerRequest() {
		const { missing, ownClaims, verifiedClaims } = getResponseClaims(
			{ ...this.props.request, type: "SelectiveDisclosureRequest" },
			this.props.credentials,
			this.props.identity
		);
		this.props.sendResponse({ request: this.props.request, ownClaims, verifiedClaims });
	}

	private onSuccess() {
		Alert.alert("Respuesta enviada");
		this.props.onGoBack(this);
	}
}

export default didiConnect(
	ScanDisclosureRequestScreen,
	(state): ScanDisclosureRequestStateProps => {
		return {
			identity: state.identity,
			credentials: state.credentials,
			sendDisclosureResponsePending: isPendingService(state.serviceCalls[serviceKey])
		};
	},
	(dispatch): ScanDisclosureRequestDispatchProps => {
		return {
			sendResponse: (args: DisclosureResponseContent) => dispatch(submitDisclosureResponse(serviceKey, args)),
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
