import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ScrollView, View, Modal } from "react-native";

import { DidiText } from "../../util/DidiText";
const { Small } = DidiText.Explanation;
import Alert from "../../util/Alert";
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
import { haveValidIdentityAndBenefit } from "../../../util/semillasHelpers";
import { PRESTADORES_FEATURE } from "../../../AppConfig";
import { CredentialDocument } from "didi-sdk";
import { PrestadoresProps } from "./PrestadoresScreen";
import { SpecialCredentialMap } from "../../../store/selector/credentialSelector";
import { haveEmailAndPhone } from "../../../util/specialCredentialsHelpers";
import DidiButton from "../../util/DidiButton";
import commonStyles from "../../resources/commonStyles";
const { modal, button, util, view } = commonStyles;
const {
	detailBarTitle,
	detailFirst,
	detailSecond,
	detailThird,
	credentialsSuccess,
	credetialsPending,
	validate
} = strings.semillas;

export interface LoginScreenProps {}

interface SemillasScreenStateProps {
	pendingCredentials: boolean;
	haveIdentityCredential: Boolean;
	didRequested: Boolean;
	credentials: CredentialDocument[];
	semillasValidationPending: boolean;
	semillasValidationFailure: boolean;
	prestadoresEnabled: boolean;
}
interface SemillasScreenState {
	dni: string;
	modalVisible: boolean;
}

interface SemillasScreenDispatchProps {
	getCredentials: (dni: string) => void;
}

type SemillasScreenInternalProps = LoginScreenProps & SemillasScreenStateProps & SemillasScreenDispatchProps;

export interface SemillasScreenNavigation {
	DashboardHome: DashboardScreenProps;
	Prestadores: PrestadoresProps;
	ValidateID: {};
	ValidateSemillasID: {};
}

const serviceKey = "CreateSemillasCredentials";

class SemillasScreen extends NavigationEnabledComponent<
	SemillasScreenInternalProps,
	SemillasScreenState,
	SemillasScreenNavigation
> {
	// navigationOptions makes reference to the topbar navigation, in this case, with a left arrow which function is return to home
	static navigationOptions = NavigationHeaderStyle.withTitleAndFakeBackButton<
		SemillasScreenNavigation,
		"DashboardHome"
	>(detailBarTitle, "DashboardHome", {});

	constructor(props: SemillasScreenInternalProps) {
		super(props);
		this.state = {
			dni: "",
			modalVisible: false
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

	renderButtonWantCredentials() {
		const { pendingCredentials, haveIdentityCredential, didRequested } = this.props;
		const onPressAction = haveIdentityCredential && !didRequested ? this.onGetCredentials : this.toggleModal;
		return (
			<DidiServiceButton
				onPress={onPressAction}
				title={strings.semillas.getCredentials}
				style={styles.button}
				isPending={pendingCredentials}
			/>
		);
	}

	renderButtonBenefits() {
		if (PRESTADORES_FEATURE) {
			const { prestadoresEnabled } = this.props;
			return prestadoresEnabled ? (
				<DidiServiceButton
					onPress={() => this.navigate("Prestadores", {})}
					title="Ver Beneficios"
					style={styles.button}
					isPending={false}
				/>
			) : (
				<Alert text={credetialsPending} style={{ marginBottom: 50 }} />
			);
		}
	}

	toggleModal = () => {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	};

	onCredentialsAdded = () => {
		DataAlert.alert(strings.semillas.program, credentialsSuccess);
	};

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
			DataAlert.alert(strings.semillas.program, strings.semillas.noDni);
		} else {
			this.showCredentialConfirmation();
		}
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

	renderPendingRequest = () => {
		return (
			<View style={{ paddingTop: 10 }}>
				<Small style={styles.modalText}>{validate.semillasProcessing}</Small>
				<Small style={styles.modalText}>{validate.semillasContacting}</Small>
				<View style={{ marginTop: 30 }}>
					<Small style={styles.smallText}>{validate.rememberYouCan}</Small>
					<Small onPress={this.goToRenaperValidation} style={[styles.smallText, { textDecorationLine: "underline" }]}>
						Validar tu identidad con {strings.appName}
					</Small>
				</View>
			</View>
		);
	};

	renderRequestDescription = () => {
		const { semillasValidationFailure } = this.props;
		return (
			<View style={{ paddingTop: 10 }}>
				<Small style={styles.modalText}>{validate.shouldDo}</Small>
				<View style={{ marginBottom: 15 }}>
					<DidiButton
						onPress={this.goToRenaperValidation}
						title={strings.validateIdentity.header}
						style={[button.lightRed, { marginTop: 20 }]}
					/>
				</View>

				{!semillasValidationFailure && (
					<View>
						<Small style={styles.smallText}>{validate.question}</Small>
						<Small
							onPress={this.goToSemillasValidation}
							style={[styles.smallText, { textDecorationLine: "underline" }]}
						>
							{validate.identityFromSemillas}
						</Small>
					</View>
				)}
			</View>
		);
	};

	render() {
		const { semillasValidationPending, didRequested, haveIdentityCredential } = this.props;
		return (
			<Fragment>
				<ServiceObserver serviceKey={serviceKey} onSuccess={this.onCredentialsAdded} />

				<StatusBar backgroundColor={themes.darkNavigation} barStyle="light-content" />

				<ScrollView>
					<SafeAreaView style={{ ...view.area, ...styles.scrollContent }}>
						<SemillasLogo viewBox="0 0 128 39" width={192} height={58} style={styles.logo} />
						<View style={{ paddingHorizontal: 15 }}>
							<Small style={util.paragraphMd}>{detailFirst}</Small>
							<Small style={util.paragraphMd}>{detailSecond}</Small>
							<Small style={util.paragraphMd}>{detailThird}</Small>
						</View>
						{!didRequested || !haveIdentityCredential
							? this.renderButtonWantCredentials()
							: this.renderButtonBenefits()}
					</SafeAreaView>
				</ScrollView>

				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={this.toggleModal}
				>
					<View style={modal.centeredView}>
						<View style={[modal.view, { height: "60%" }]}>
							{semillasValidationPending ? this.renderPendingRequest() : this.renderRequestDescription()}
						</View>
					</View>
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
		prestadoresEnabled:
			haveValidIdentityAndBenefit(state.allSemillasCredentials) && haveEmailAndPhone(state.activeSpecialCredentials),
		didRequested: state.did.didRequested,
		haveIdentityCredential: state.credentials.find(cred => cred.specialFlag?.type === "PersonalData") !== undefined,
		semillasValidationPending: state.validateSemillasDni?.state === "In Progress",
		semillasValidationFailure: state.validateSemillasDni?.state === "Failure"
	}),
	(dispatch): SemillasScreenDispatchProps => ({
		getCredentials: dni => dispatch(getUserCredentials(serviceKey, dni))
	})
);

const styles = StyleSheet.create({
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
		fontSize: 12,
		textAlign: "right"
	},
	modalText: {
		fontSize: 15,
		textAlign: "left"
	}
});
