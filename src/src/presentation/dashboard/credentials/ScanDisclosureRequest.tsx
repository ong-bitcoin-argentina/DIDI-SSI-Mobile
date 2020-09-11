import { CredentialDocument, Identity, SelectiveDisclosureRequest, SelectiveDisclosureResponse } from "didi-sdk";
import React from "react";
import { Alert, StyleSheet } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import { ErrorDataAlert } from "../../common/ErrorDataAlert";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";
import { RequestCard } from "../common/RequestCard";

import { RecentActivity } from "../../../model/RecentActivity";
import {
	submitDisclosureResponse,
	SubmitDisclosureResponseContent
} from "../../../services/issuer/submitDisclosureResponse";
import { isPendingService } from "../../../services/ServiceStateStore";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { IssuerRegistry } from "../../../store/reducers/issuerReducer";
import { didiConnect } from "../../../store/store";
import { getCredentials } from "../../../uPort/getCredentials";
import { serviceErrors } from "../../resources/serviceErrors";
import strings from "../../resources/strings";

import { ScanCredentialProps } from "./ScanCredential";
import { ShowDisclosureResponseProps } from "./ShowDisclosureResponse";

export interface ScanDisclosureRequestProps {
	request: SelectiveDisclosureRequest;
	onGoBack(screen: ScanDisclosureRequestScreen): void;
}
interface ScanDisclosureRequestStateProps {
	did: ActiveDid;
	identity: Identity;
	knownIssuers: IssuerRegistry;
	credentials: CredentialDocument[];

	sendDisclosureResponsePending: boolean;
}
interface ScanDisclosureRequestDispatchProps {
	sendResponse: (args: SubmitDisclosureResponseContent) => void;
	storeRequest: (request: SelectiveDisclosureRequest) => void;
	recordCallback: (documents: CredentialDocument[]) => void;
	recordShare: (documents: CredentialDocument[]) => void;
}
type ScanDisclosureRequestInternalProps = ScanDisclosureRequestProps &
	ScanDisclosureRequestStateProps &
	ScanDisclosureRequestDispatchProps;

export interface ScanDisclosureRequestNavigation {
	ScanCredential: ScanCredentialProps;
	ShowDisclosureResponse: ShowDisclosureResponseProps;
}

const serviceKey = "ScanDisclosureRequest";

class ScanDisclosureRequestScreen extends NavigationEnabledComponent<
	ScanDisclosureRequestInternalProps,
	{},
	ScanDisclosureRequestNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.scanCredential.barTitle);

	componentDidMount() {
		this.props.storeRequest(this.props.request);
	}

	render() {
		return (
			<DidiScreen style={styles.body}>
				<RequestCard
					style={{ marginHorizontal: 20 }}
					request={this.props.request}
					context={{ knownIssuers: this.props.knownIssuers }}
				/>
				<ServiceObserver serviceKey="ScanDisclosureRequest" onSuccess={() => this.onSuccess()} />
				<DidiServiceButton
					onPress={() => this.answerRequest()}
					title="Enviar datos"
					isPending={this.props.sendDisclosureResponsePending}
				/>
			</DidiScreen>
		);
	}

	private async answerRequest() {
		const { missingRequired, ownClaims, verifiedClaims } = SelectiveDisclosureResponse.getResponseClaims(
			this.props.did!,
			this.props.request,
			this.props.credentials,
			this.props.identity
		);

		if (missingRequired.length > 0) {
			const required = missingRequired.map(strings.credentialRequestCard.formatField).join("\n - ");
			Alert.alert("Faltan Credenciales", `No dispones de datos requeridos:\n - ${required}`);
			return;
		}

		try {
			const credentials = await getCredentials();
			const responseToken = await SelectiveDisclosureResponse.signJWT(
				credentials,
				this.props.request,
				ownClaims,
				verifiedClaims
			);

			if (this.props.request.callback) {
				this.props.sendResponse({ callback: this.props.request.callback, token: responseToken });
				this.props.recordCallback(this.props.credentials);
			} else {
				this.navigate("ShowDisclosureResponse", {
					responseToken
				});
				this.props.recordShare(this.props.credentials);
			}
		} catch (signerError) {
			console.warn(signerError);
			ErrorDataAlert.alert(serviceErrors.disclosure.SIGNING_ERR);
		}
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
			did: state.did.activeDid,
			identity: state.identity,
			credentials: state.credentials,
			knownIssuers: state.knownIssuers,
			sendDisclosureResponsePending: isPendingService(state.serviceCalls[serviceKey])
		};
	},
	(dispatch): ScanDisclosureRequestDispatchProps => {
		return {
			sendResponse: (args: SubmitDisclosureResponseContent) => dispatch(submitDisclosureResponse(serviceKey, args)),
			storeRequest: (request: SelectiveDisclosureRequest) => dispatch({ type: "TOKEN_ENSURE", content: [request.jwt] }),
			recordCallback: (documents: CredentialDocument[]) =>
				dispatch({
					type: "RECENT_ACTIVITY_ADD",
					value: RecentActivity.from("SHARE", documents)
				}),
			recordShare: (documents: CredentialDocument[]) =>
				dispatch({
					type: "RECENT_ACTIVITY_ADD",
					value: RecentActivity.from("SHARE", documents)
				})
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
