import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { didiConnect } from "../../../store/store";
import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
import DidiButton from "../../util/DidiButton";
import commonStyles from "../../resources/commonStyles";
import colors from "../../resources/colors";
import { ValidationStates } from "../../../store/reducers/validateCoopsolDniReducer";
import { CredentialDocument } from "@proyecto-didi/app-sdk";
import { validateDniCoopsol } from "../../../services/coopsol/validateDni";

const {
	Icon,
	Explanation: { Small }
} = DidiText;
const { dashboard, coopsol } = strings;
const { validate } = coopsol;
const { validateIdentity } = dashboard;
const { modal, button } = commonStyles;

interface StoreProps {
	credentials:  CredentialDocument[];
	validationState: ValidationStates | null;
	validateDniFailed: boolean;
	validateDni: boolean;
}

interface State {
	pendingCredentials: boolean
}

type InternalProps = {
	goToVuSecurityValidation: () => void;
	goToCoopsolValidation: () => void;
	onCancel: () => void;
	isLoading: boolean;
};

interface DispatchProps {
	updateCoopsolStatus: (status: string | null) => void;
}

type Props = StoreProps & InternalProps & DispatchProps;

class CoopsolValidationState extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			pendingCredentials: false
		};
	}

	async componentDidMount(){
		this.setState((state) => ({
			pendingCredentials:  !state.pendingCredentials, 
		}));
		const { credentials , validationState} = this.props;
		const credential = credentials.find(
			cred => cred.title === strings.specialCredentials.PersonalData.title && cred.data["Numero de Identidad"]
		);
		const coopsolCredential = credentials.find(
			cred => cred.title === 'Identitaria coopsol'
		);
		
		if ((validationState === null ||  validationState === 'FAILURE') && (credential && credential.data["Numero de Identidad"])) {
				const result = await validateDniCoopsol(credential.jwt);
				this.props.updateCoopsolStatus(result.status);
		}
		
		if (validationState === 'IN_PROGRESS' && coopsolCredential) this.props.updateCoopsolStatus('SUCCESS');


		this.setState((state) => ({
			pendingCredentials:  !state.pendingCredentials, 
		}));	
	}

	renderContent = () => {
		const { validationState } = this.props;
		const { inProgress, failure, success } = ValidationStates;
		switch (validationState) {
			case inProgress:
				return this.renderPendingRequest();
			case failure:
				return this.renderFailureRequest();
			case success:
				return this.renderSuccessRequest();
			default:
				return this.renderRequestDescription();
		}
	};

	renderRenaperDescription = () => {
		return (
			<View style={{ marginTop: 30 }}>
				<Small style={styles.smallText}>{validate.rememberYouCan}</Small>
				<Small
					onPress={this.props.goToVuSecurityValidation}
					style={[styles.smallText, { textDecorationLine: "underline" }]}
				>
					Validar tu identidad con {strings.appName}
				</Small>
			</View>
		);
	};

	renderFailureRequest = () => {
		return (
			<View>
				<Icon fontSize={38} color={colors.error} style={{ marginBottom: 10 }}>
					highlight_off
				</Icon>
				<Small style={styles.modalText}>{' El servicio de Coopsol está fuera de servicio momentáneamente. \n Envíe su solicitud al correo:\n jduttweiler@acdi.org.ar \n'}</Small>
			</View>
		);
	};

	renderPendingRequest = () => {
		return (
			<View>
				<Icon fontSize={38} color={colors.primary} style={{ marginBottom: 10 }}>
					hourglass_empty
				</Icon>
				<Small style={styles.modalText}>{validate.coopsolProcessing}</Small>
				<Small style={styles.modalText}>{validate.coopsolContacting}</Small>
				<Small style={styles.modalText}>{validate.coopsolRecommendation}</Small>
			</View>
		);
	};

	renderSuccessRequest = () => {
		return (
			<View>
				<Icon fontSize={38} color={colors.greenCoopsol} style={{ marginBottom: 10 }}>
					done
				</Icon>
				<Small style={styles.modalText}>{validate.aprroved}</Small>
			</View>
		);
	};

	renderRequestDescription = () => {
		const { goToVuSecurityValidation, goToCoopsolValidation, validateDni , validateDniFailed } = this.props;	
		let visibleTitle ='';
		if (validateDniFailed) {
			visibleTitle = validateIdentity.Failed.button;
		} else {
			visibleTitle = strings.validateIdentity.header;
		}
		return (
			<View style={{ paddingTop: 10 }}>
				<Small style={styles.modalText}>
					{validateDniFailed ? 
					validateIdentity.Failed.title : validate.shouldDo}</Small>
				<View style={{ marginBottom: 15 }}>
					{!validateDni?<DidiButton
						onPress={goToVuSecurityValidation}
						title={visibleTitle}
						style={[button.lightRed, styles.renaperButton]}/>: null}
				</View>

				 <View>
					{!validateDni? <Small style={styles.smallText}>{validate.question}</Small>:null}
					<Small onPress={goToCoopsolValidation} style={[styles.smallText, { textDecorationLine: "underline" }]}>
						{validate.identityFromCoopsol}
					</Small>
				</View> 
			</View>
		);
	};

	render() {
		const { onCancel } = this.props;

		return (
			<View style={[modal.centeredView]}>
				<View style={[modal.view, { maxHeight: 500 }]}>
					<ScrollView contentContainerStyle={{ alignItems: "center" }}>
						{this.state.pendingCredentials ? (
							<>
								<Small style={{ marginBottom: 10 }}>{validate.gettingState}</Small>
								<ActivityIndicator size="large" color={colors.secondary} />
							</>
						) : (
							this.renderContent()
						)}
						<DidiButton title={strings.buttons.accept} onPress={onCancel} style={{ marginTop: 5 }} />
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default didiConnect(
	CoopsolValidationState,
	(state): StoreProps => ({
		credentials: state.credentials,
		validationState: state.validateCoopsolDni,
		validateDniFailed: state.validateDni?.state === "Failed",
		validateDni: state.validateDni?.state=="Successful"
	}),
	(dispatch): DispatchProps => ({
		updateCoopsolStatus: (status: string | null) => dispatch({ type: "VALIDATE_COOPSOL_DNI_SET", state: status }),
	})
);

const styles = StyleSheet.create({
	renaperButton: {
		marginTop: 20,
		paddingVertical: 26
	},
	button: {
		marginTop: 30,
		paddingHorizontal: 20
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
