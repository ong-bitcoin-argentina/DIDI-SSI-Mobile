import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, View, Modal, Alert } from "react-native";

import { DidiText } from "../../util/DidiText";
const { Small } = DidiText.Explanation;
import NavigationEnabledComponent from "../../util/NavigationEnabledComponent";

import { didiConnect } from "../../../store/store";
import strings from "../../resources/strings";
import themes from "../../resources/themes";
import { DashboardScreenProps } from "../home/Dashboard";
import NavigationHeaderStyle from "../../common/NavigationHeaderStyle";
import { DidiServiceButton } from "../../util/DidiServiceButton";
import SemillasLogo from "../../resources/images/sem-logo.svg";
import { ServiceObserver } from "../../common/ServiceObserver";
import { DataAlert } from "../../common/DataAlert";
import { isPendingService } from "../../../services/ServiceStateStore";
import { getUserCredentials } from "../../../services/semillas/getCredentials";
import { CredentialDocument } from "didi-sdk";
import { PrestadoresProps } from "./PrestadoresScreen";
import commonStyles from "../../resources/commonStyles";
import colors from "../../resources/colors";
import { LATEST_FEATURE } from "../../../AppConfig";
import { ValidationStates } from "./constants";
import SemillasValidationState from "./SemillasValidationState";
import { getSemillasValidationState } from "../../../services/semillas/getValidationState";
import { haveValidIdentity } from "../../../util/semillasHelpers";
const { util, view } = commonStyles;
const {
	detailBarTitle,
	detailFirst,
	detailSecond,
	detailThird,
	credentialsSuccess,
	program,
	noDni,
	validate
} = strings.semillas;

export interface LoginScreenProps {}

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
	haveIdentityCredential: Boolean;
	didRequested: Boolean;
	credentials: CredentialDocument[];
	semillasValidationSuccess: boolean;
	haveValidSemillasIdentity: boolean;
}
interface SemillasScreenState {
	dni: string;
	modalVisible: boolean;
	semillasValidationLoading: boolean;
}

interface SemillasScreenDispatchProps {
	getCredentials: (dni: string) => void;
	getSemillasValidationState: () => void;
}

type SemillasScreenInternalProps = LoginScreenProps & SemillasScreenStateProps & SemillasScreenDispatchProps;

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: PrestadoresProps;
	ValidateID: {};
	ValidateSemillasID: {};
}

const serviceKey = "CreateSemillasCredentials";
const serviceKeyState = "semillasValidationState";

class SemillasScreen extends NavigationEnabledComponent<
	SemillasScreenInternalProps,
	SemillasScreenState,
	SemillasScreenNavigation
> {
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SemillasScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});

	constructor(props: SemillasScreenInternalProps) {
		super(props);
		this.state = {
			dni: "",
			modalVisible: false,
			semillasValidationLoading: false
		};
	}

	componentDidMount() {
		const { credentials } = this.props;
		// We look into the credentials to check if there's an identity credential with DNI
		const cred = credentials.find(
			cred => cred.title === strings.specialCredentials.PersonalData.title && cred.data.dni
		);

		if (cred && cred.data.dni) {
			this.setState({
				dni: cred.data.dni.toString()
			});
		}
	}

	// Functional Methods

	goToRenaperValidation = () => {
		this.toggleModal();
		this.navigate("ValidateID", {});
	};

	goToSemillasValidation = () => {
		this.toggleModal();
		this.navigate("ValidateSemillasID", {});
	};

	onGetCredentials = () => {
		const { dni } = this.state;
		if (!dni) {
			DataAlert.alert(program, noDni);
		} else {
			this.showCredentialConfirmation();
		}
	};

	onCredentialsAdded = () => {
		DataAlert.alert(program, credentialsSuccess);
	};

	onSuccessGetState = () => {
		this.setState({ semillasValidationLoading: false });
	};

	onErrorGetState = () => {
		this.setState({ semillasValidationLoading: false });
	};

	openModal = () => {
		const { semillasValidationSuccess } = this.props;
		if (!semillasValidationSuccess) {
			this.setState({ semillasValidationLoading: true });
			this.props.getSemillasValidationState();
		}
		this.setState({ modalVisible: true });
	};

	showCredentialConfirmation = () => {
		const { getCredentials } = this.props;
		const { dni } = this.state;

		DataAlert.alert(
			strings.semillas.program,
			strings.semillas.shareMessage,
			() => {},
			() => getCredentials(dni)
		);
	};

	toggleModal = () => {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	};

	// Render Methods

	renderButtonBenefits() {
		return (
			<DidiServiceButton
				onPress={() => this.navigate("Prestadores", {})}
				title="Ver Beneficios"
				style={styles.button}
				isPending={false}
			/>
		);
	}

	renderButtonWantCredentials() {
		const { pendingCredentials, haveIdentityCredential } = this.props;

		const onPressAction = haveIdentityCredential || !LATEST_FEATURE ? this.onGetCredentials : this.openModal;
		return (
			<DidiServiceButton
				onPress={onPressAction}
				title={strings.semillas.getCredentials}
				style={styles.button}
				isPending={pendingCredentials}
			/>
		);
	}

	render() {
		const { didRequested, haveIdentityCredential, semillasValidationSuccess, haveValidSemillasIdentity } = this.props;
		const { semillasValidationLoading } = this.state;
		const mustShowBenefitsButton =
			(didRequested && haveIdentityCredential) || semillasValidationSuccess || haveValidSemillasIdentity;
		return (
			<Fragment>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.onCredentialsAdded} />
				<ServiceObserver
					serviceKey={serviceKeyState}
					onSuccess={this.onSuccessGetState}
					onError={this.onErrorGetState}
				/>

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView contentContainerStyle={commonStyles.view.scrollCentered}>
					<SemillasLogo viewBox="0 0 128 39" width={192} height={58} style={styles.logo} />
					<View style={{ marginBottom: 18 }}>
						<Small style={util.paragraphMd}>{detailFirst}</Small>
						<Small style={util.paragraphMd}>{detailSecond}</Small>
						<Small style={util.paragraphMd}>{detailThird}</Small>
					</View>
					<View style={{ marginBottom: 20 }}>
						{mustShowBenefitsButton ? this.renderButtonBenefits() : this.renderButtonWantCredentials()}
					</View>
				</ScrollView>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={this.toggleModal}
				>
					<SemillasValidationState
						goToRenaperValidation={this.goToRenaperValidation}
						goToSemillasValidation={this.goToSemillasValidation}
						onCancel={this.toggleModal}
						isLoading={semillasValidationLoading}
					/>
				</Modal>
			</Fragment>
		);
	}
}

export default didiConnect(
	SemillasScreen,
	(state): SemillasScreenStateProps => ({
		pendingCredentials: isPendingService(state.serviceCalls[serviceKey]),
		credentials: state.credentials,
		didRequested: state.did.didRequested,
		haveIdentityCredential: state.credentials.find(cred => cred.specialFlag?.type === "PersonalData") !== undefined,
		haveValidSemillasIdentity: haveValidIdentity(state.activeSemillasCredentials),
		semillasValidationSuccess: state.validateSemillasDni === ValidationStates.success
	}),
	(dispatch): SemillasScreenDispatchProps => ({
		getCredentials: dni => dispatch(getUserCredentials(serviceKey, dni)),
		getSemillasValidationState: () => dispatch(getSemillasValidationState(serviceKeyState))
	})
);

const styles = StyleSheet.create({
	body: {
		width: "100%"
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
		paddingHorizontal: 30
	},
	buttonText: {
		fontSize: 16
	},
	logo: {
		height: 50,
		width: 50,
		marginVertical: 10
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
	}
});
