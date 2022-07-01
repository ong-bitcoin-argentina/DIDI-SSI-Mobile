import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { didiConnect } from "../../../store/store";
import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
import DidiButton from "../../util/DidiButton";
import commonStyles from "../../resources/commonStyles";
import colors from "../../resources/colors";
import { ValidationStates } from "../../../store/reducers/validateCoopsolDniReducer";

const {
	Icon,
	Explanation: { Small }
} = DidiText;
const { dashboard, coopsol } = strings;
const { validate } = coopsol;
const { validateIdentity } = dashboard;
const { modal, button } = commonStyles;

interface StoreProps {
	validationState: ValidationStates | null;
	validateDniFailed: boolean;
	validateDni: boolean;
}

interface State {}

type InternalProps = {
	goToVuSecurityValidation: () => void;
	goToCoopsolValidation: () => void;
	onCancel: () => void;
	isLoading: boolean;
};

type Props = StoreProps & InternalProps;

class CoopsolValidationState extends Component<Props, State> {
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
				<Small style={styles.modalText}>{validate.rejected}</Small>
				{this.renderRenaperDescription()}
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
		const { goToVuSecurityValidation, validateDni , validateDniFailed } = this.props;	
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

				 {/* <View>
					{!validateDni? <Small style={styles.smallText}>{validate.question}</Small>:null}
					<Small onPress={goToCoopsolValidation} style={[styles.smallText, { textDecorationLine: "underline" }]}>
						{validate.identityFromCoopsol}
					</Small>
				</View> */}
			</View>
		);
	};

	render() {
		const { onCancel, isLoading } = this.props;

		return (
			<View style={[modal.centeredView]}>
				<View style={[modal.view, { maxHeight: 500 }]}>
					<ScrollView contentContainerStyle={{ alignItems: "center" }}>
						{isLoading ? (
							<>
								<Small style={{ marginBottom: 10 }}>{validate.gettingState}</Small>
								<ActivityIndicator size="large" color={colors.secondary} />
							</>
						) : (
							this.renderContent()
						)}
						<DidiButton title={strings.buttons.close} onPress={onCancel} style={{ marginTop: 5 }} />
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default didiConnect(
	CoopsolValidationState,
	(state): StoreProps => ({
		validationState: state.validateCoopsolDni,
		validateDniFailed: state.validateDni?.state === "Failed",
		validateDni: state.validateDni?.state=="Successful"
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
