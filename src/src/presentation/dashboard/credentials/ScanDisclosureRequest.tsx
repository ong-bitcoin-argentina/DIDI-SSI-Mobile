import React from "react";
import { Alert, StyleSheet } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { CredentialDocument } from "../../../model/CredentialDocument";
import { DerivedCredential } from "../../../model/DerivedCredential";
import { RequestDocument } from "../../../model/RequestDocument";
import {
	submitDisclosureResponse,
	SubmitDisclosureResponseArguments
} from "../../../services/issuer/submitDisclosureResponse";
import { isPendingService } from "../../../services/ServiceStateStore";
import { ValidatedIdentity } from "../../../store/selector/combinedIdentitySelector";
import { didiConnect } from "../../../store/store";
import { getResponseClaims } from "../../../uPort/createDisclosureResponse";

import { ScanCredentialProps } from "./ScanCredential";

export interface ScanDisclosureRequestProps {
	request: RequestDocument;
	onGoBack(screen: ScanDisclosureRequestScreen): void;
}
interface ScanDisclosureRequestStateProps {
	identity: ValidatedIdentity;
	credentials: Array<DerivedCredential<CredentialDocument>>;
	microCredentials: CredentialDocument[];

	sendDisclosureResponsePending: boolean;
}
interface ScanDisclosureRequestDispatchProps {
	sendResponse: (args: SubmitDisclosureResponseArguments) => void;
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
		const { missing, own, verified } = getResponseClaims(
			this.props.request.content,
			this.props.microCredentials,
			this.props.identity
		);
		this.props.sendResponse({ request: this.props.request, own, verified });
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
			microCredentials: state.microCredentials,
			sendDisclosureResponsePending: isPendingService(state.serviceCalls[serviceKey])
		};
	},
	(dispatch): ScanDisclosureRequestDispatchProps => {
		return {
			sendResponse: (args: SubmitDisclosureResponseArguments) => dispatch(submitDisclosureResponse(serviceKey, args)),
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
