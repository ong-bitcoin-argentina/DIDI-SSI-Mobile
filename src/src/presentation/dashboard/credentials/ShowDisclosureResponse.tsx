import React from "react";
import { Dimensions, StyleSheet, View, ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { DidiScrollScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import { didiConnect } from "../../../store/store";
import { saveShareRequest } from "../../../services/user/saveShareRequest";
import { createToken } from "../../util/appRouter";
import { ActiveDid } from "../../../store/reducers/didReducer";

enum RequestStatus {
	loading = "loading",
	error = "error",
	success = "success"
}

interface InternalProps {
	responseToken: string;
}
interface StateProps {
	did: ActiveDid;
}

interface InternalState {
	index: number;
	requestStatus: RequestStatus;
	qrCode: string | null;
}

const { Normal } = DidiText.Explanation;

export type ShowDisclosureResponseProps = InternalProps & StateProps;

export type ShowDisclosureResponseState = InternalState;

export type ShowDisclosureResponseNavigation = {};

class ShowDisclosureResponseScreen extends NavigationEnabledComponent<
	ShowDisclosureResponseProps,
	ShowDisclosureResponseState,
	ShowDisclosureResponseNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitle(strings.disclose.title);

	constructor(props: ShowDisclosureResponseProps) {
		super(props);
		this.state = {
			index: 0,
			requestStatus: RequestStatus.loading,
			qrCode: null
		};
	}

	async componentDidMount() {
		const userJWT = await this.getToken();
		this.handleSaveShareRequest(userJWT);
	}

	getToken = async () => {
		return await createToken(this.props.did);
	};

	handleSaveShareRequest = async (userJWT: string) => {
		const { responseToken } = this.props;
		try {
			const result = await saveShareRequest(userJWT, responseToken);
			console.log(result);
			this.setState({ requestStatus: RequestStatus.success, qrCode: result.data });
		} catch (error) {
			this.setState({ requestStatus: RequestStatus.error });
		}
	};

	renderSuccess = () => {
		return (
			<View style={{ alignItems: "center" }}>
				<Normal style={{ marginBottom: 30 }}>{strings.disclose.response.explanation}</Normal>
				{!!this.state.qrCode && <QRCode size={0.75 * Dimensions.get("window").width} value={this.state.qrCode} />}
				<DidiButton style={styles.readyButton} title={strings.buttons.ready} onPress={() => this.goToRoot()} />
			</View>
		);
	};

	renderError = () => {
		return (
			<>
				<Normal>{strings.disclose.response.error}</Normal>
				<DidiButton title={strings.buttons.back} onPress={() => this.goBack()} />
			</>
		);
	};

	renderContent = () => {
		switch (this.state.requestStatus) {
			case RequestStatus.loading:
				return <ActivityIndicator size="large" />;
			case RequestStatus.error:
				return this.renderError();
			case RequestStatus.success:
				return this.renderSuccess();
		}
	};

	render() {
		return <DidiScrollScreen contentContainerStyle={styles.container}>{this.renderContent()}</DidiScrollScreen>;
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 10
	},
	readyButton: {
		marginTop: 50,
		marginBottom: 20,
		paddingHorizontal: 80
	}
});

const connected = didiConnect(
	ShowDisclosureResponseScreen,
	(state): StateProps => ({
		did: state.did.activeDid
	})
);

export { connected as ShowDisclosureResponseScreen };
