import React from "react";
import { StyleSheet, View, ScrollView, Modal, ActivityIndicator } from "react-native";

import { DidiScreen } from "../../common/DidiScreen";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import strings from "../../resources/strings";
import { DashboardScreenProps } from "../home/Dashboard";
import DidiButton from "../../util/DidiButton";
import colors from "../../resources/colors";
import { DidiText } from "../../util/DidiText";
import RondasLogo from "../../resources/images/rondasSplash.svg";
import { ActiveDid } from "../../../store/reducers/didReducer";
import { didiConnect } from "../../../store/store";
import { AuthModal } from "../common/AuthModal";
import { createToken, successfullyLogged } from "../../util/appRouter";
import { userHasRonda } from "../../../services/user/userHasRonda";
import { getPersonalData } from "../../../services/user/getPersonalData";
import { ServiceObserver } from "../../common/ServiceObserver";
import { PersistedPersonalData } from "../../../store/reducers/persistedPersonalDataReducer";
import commonStyles from "../../resources/commonStyles";
import DidiTextInput from "../../util/DidiTextInput";
import { sendPersonalData } from "../../../services/user/sendPersonalData";
import { DataAlert } from "../../common/DataAlert";
const { modal } = commonStyles;

const {
	rounds: { description, descriptionHasRonda, title, titleHasRonda, completeData, dataConfirmed }
} = strings;

export type RoundsScreenState = {
	showModal: boolean;
	showPersonalDataModal: boolean;
	token: string;
	name: string;
	lastname: string;
	hiddenProcess: boolean;
};
export interface RoundsScreenNavigation {
	DashboardHome: DashboardScreenProps;
}
const { Small, Emphasis } = DidiText.Explanation;

interface RoundsScreenStateProps {
	did: ActiveDid;
	hasRonda: Boolean;
	persistedPersonalData: PersistedPersonalData;
	name?: string;
	lastname?: string;
}

interface RoundsScreenDispatchProps {
	setRondaAccount: (hasAccount: Boolean) => void;
	saveName: (name: string, lastname: string) => void;
	persistPersonalData: (name: string, lastname: string) => void;
	getPersonalData: (token: string) => void;
	sendPersonalData: (token: string, name: string, lastname: string) => void;
}

export type RoundsScreenProps = RoundsScreenStateProps & RoundsScreenDispatchProps;

const serviceKey = "getPersonalData";
const serviceKeySendData = "sendPersonalData";

const RoundsScreen = class RoundsScreen extends NavigationEnabledComponent<
	RoundsScreenProps,
	RoundsScreenState,
	RoundsScreenNavigation
> {
	constructor(props: RoundsScreenProps) {
		super(props);
		this.state = {
			showModal: false,
			showPersonalDataModal: false,
			token: "",
			name: "",
			lastname: "",
			hiddenProcess: false
		};
	}

	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<RoundsScreenNavigation, "DashboardHome">(
		strings.tabNames.rounds,
		"DashboardHome",
		{}
	);

	componentDidMount = async () => {
		const token = await this.getToken();
		this.setState({ token });
		this.handleCheckPersistedData(token);
		const { did, hasRonda, setRondaAccount } = this.props;
		if (!hasRonda) {
			const response = await userHasRonda(did);
			const hasAccount = response._tag ? true : false;
			setRondaAccount(hasAccount);
		}
	};

	handleCheckPersistedData = (token: string) => {
		if (this.props.name && this.props.lastname) {
			const { name, lastname } = this.props.persistedPersonalData;
			this.setState({ hiddenProcess: true });
			if (!name && !lastname) {
				this.props.sendPersonalData(token, this.props.name, this.props.lastname);
			}
		} else {
			this.props.getPersonalData(token);
		}
	};

	showAuthModal = async () => {
		this.setState({ showModal: true });
	};

	getToken = async () => {
		return await createToken(this.props.did);
	};

	goRonda = async () => {
		this.getToken().then(verification => {
			this.setState({ showModal: false }, () => successfullyLogged(verification));
		});
	};

	permissionDenied = async () => this.setState({ showModal: false });

	showConfirmation = () => {
		if (!this.state) return null;
		const { showModal } = this.state;
		return showModal ? <AuthModal appName="Ronda" onCancel={this.permissionDenied} onOk={this.goRonda} /> : null;
	};

	handleSuccessGetPersonalData = () => {
		const { name, lastname } = this.props.persistedPersonalData;
		if (name && lastname) {
			this.props.persistPersonalData(name, lastname);
			this.props.saveName(name, lastname);
		} else {
			this.toggleModal();
		}
	};

	handleSuccessSendPersonalData = () => {
		const { name, lastname } = this.props.persistedPersonalData;
		this.props.saveName(name, lastname);
		if (!this.state.hiddenProcess) {
			DataAlert.alert("Éxito!", dataConfirmed);
		}
	};

	toggleModal = () => {
		this.setState({
			showPersonalDataModal: !this.state.showPersonalDataModal
		});
	};

	onChangeName = (name: string) => {
		this.setState({ name });
	};

	onChangeLastname = (lastname: string) => {
		this.setState({ lastname });
	};

	onSendPersonalData = () => {
		const { name, lastname, token } = this.state;
		this.props.sendPersonalData(token, name, lastname);
		this.toggleModal();
	};

	render() {
		const { hasRonda } = this.props;
		const subTitle = hasRonda ? descriptionHasRonda : description;
		const cta = "Ver Rondas";
		const btnAction = hasRonda ? this.goRonda : this.showAuthModal;
		return (
			<>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.handleSuccessGetPersonalData} />
				<ServiceObserver serviceKey={serviceKeySendData} onSuccess={this.handleSuccessSendPersonalData} />
				<DidiScreen>
					<ScrollView>
						<View style={[styles.centered, { marginVertical: 26 }]}>
							<RondasLogo />
						</View>
						<Emphasis style={[styles.modalText, { marginBottom: 10 }]}>{hasRonda ? titleHasRonda : title}</Emphasis>
						<Small style={[styles.modalText, { marginBottom: 25 }]}>{subTitle}</Small>
						<View style={{ marginBottom: 15 }}>
							<DidiButton onPress={btnAction} title={cta} />
							{this.showConfirmation()}
						</View>
					</ScrollView>
				</DidiScreen>

				<Modal animationType="fade" transparent={true} visible={this.state.showPersonalDataModal}>
					<View style={modal.centeredView}>
						<View style={[modal.view]}>
							<Emphasis style={[styles.modalText, { marginBottom: 20 }]}>{completeData}</Emphasis>
							<DidiTextInput.FirstName onChangeText={this.onChangeName} />
							<DidiTextInput.LastName onChangeText={this.onChangeLastname} />
							<View style={styles.modalFooter}>
								<DidiButton title={strings.buttons.close} style={{ marginTop: 30 }} onPress={this.toggleModal} />
								<DidiButton title={strings.buttons.send} style={{ marginTop: 30 }} onPress={this.onSendPersonalData} />
							</View>
						</View>
					</View>
				</Modal>
			</>
		);
	}
};

const connect = didiConnect(
	RoundsScreen,
	(state): RoundsScreenStateProps => ({
		did: state.did.activeDid,
		hasRonda: state.authApps.ronda,
		name: state.validatedIdentity.personalData.firstNames?.value,
		lastname: state.validatedIdentity.personalData.lastNames?.value,
		persistedPersonalData: state.persistedPersonalData
	}),
	(dispatch): RoundsScreenDispatchProps => ({
		setRondaAccount: (hasAccount: Boolean) => dispatch({ type: "SET_RONDA_ACCOUNT", value: hasAccount }),
		getPersonalData: token => dispatch(getPersonalData(serviceKey, token)),
		sendPersonalData: (token, name, lastname) => dispatch(sendPersonalData(serviceKeySendData, token, name, lastname)),
		persistPersonalData: (name: string, lastname: string) =>
			dispatch({ type: "PERSISTED_PERSONAL_DATA_SET", state: { name, lastname } }),
		saveName: (firstNames: string, lastNames: string) =>
			dispatch({
				type: "IDENTITY_PATCH",
				value: {
					personalData: { firstNames, lastNames },
					visual: {},
					address: {}
				}
			})
	})
);

export { connect as RoundsScreen };

const styles = StyleSheet.create({
	centered: {
		alignItems: "center",
		justifyContent: "center"
	},
	body: {
		width: "100%"
	},
	scrollContent: {
		backgroundColor: "white",
		paddingVertical: 8
	},
	warningMessage: {
		fontSize: 18,
		marginTop: 20
	},
	renaperButton: {
		marginTop: 20,
		paddingVertical: 26
	},
	button: {
		marginTop: 30,
		paddingHorizontal: 20
	},
	buttonText: {
		fontSize: 16
	},
	logo: {
		height: 50,
		width: 50,
		marginVertical: 25
	},
	hidden: {
		display: "none"
	},
	smallText: {
		fontSize: 14,
		color: colors.textLight
	},
	modalText: {
		fontSize: 17,
		textAlign: "center"
	},
	modalFooter: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly"
	}
});
