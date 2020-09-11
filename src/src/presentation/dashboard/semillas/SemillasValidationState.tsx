import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { didiConnect } from "../../../store/store";
import { ValidationStates } from "./constants";
import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
import DidiButton from "../../util/DidiButton";
import commonStyles from "../../resources/commonStyles";
import colors from "../../resources/colors";
import { DataAlert } from "../../common/DataAlert";

const { Small } = DidiText.Explanation;
const { validate } = strings.semillas;
const { modal, button } = commonStyles;

interface StoreProps {
	validationState: ValidationStates | null;
}

interface State {}

type InternalProps = {
	goToRenaperValidation: () => void;
	goToSemillasValidation: () => void;
	onCancel: () => void;
	isLoading: boolean;
};

type Props = StoreProps & InternalProps;

class SemillasValidationState extends Component<Props, State> {
	renderContent = () => {
		const { validationState } = this.props;
		switch (validationState) {
			case ValidationStates.inProgress:
				return this.renderPendingRequest();
			case ValidationStates.failure:
				return this.renderFailureRequest();
			default:
				return this.renderRequestDescription();
		}
	};

	renderFailureRequest = () => {
		return (
			<View>
				<Small style={styles.modalText}>
					Tu solicitud de validación de identidad ha sido rechazada por Semillas. Por favor, contactate con tu Asesor.
				</Small>
			</View>
		);
	};

	renderPendingRequest = () => {
		return (
			<View>
				<Small style={styles.modalText}>{validate.semillasProcessing}</Small>
				<Small style={styles.modalText}>{validate.semillasContacting}</Small>
				<View style={{ marginTop: 30 }}>
					<Small style={styles.smallText}>{validate.rememberYouCan}</Small>
					<Small
						onPress={this.props.goToRenaperValidation}
						style={[styles.smallText, { textDecorationLine: "underline" }]}
					>
						Validar tu identidad con {strings.appName}
					</Small>
				</View>
			</View>
		);
	};

	renderRequestDescription = () => {
		const { goToRenaperValidation, goToSemillasValidation } = this.props;
		return (
			<View style={{ paddingTop: 10 }}>
				<Small style={styles.modalText}>{validate.shouldDo}</Small>
				<View style={{ marginBottom: 15 }}>
					<DidiButton
						onPress={goToRenaperValidation}
						title={strings.validateIdentity.header}
						style={[button.lightRed, styles.renaperButton]}
					/>
				</View>

				<View>
					<Small style={styles.smallText}>{validate.question}</Small>
					<Small onPress={goToSemillasValidation} style={[styles.smallText, { textDecorationLine: "underline" }]}>
						{validate.identityFromSemillas}
					</Small>
				</View>
			</View>
		);
	};

	render() {
		const { onCancel, isLoading } = this.props;

		return (
			<View style={modal.centeredView}>
				<View style={[modal.view]}>
					{isLoading ? <ActivityIndicator size="large" color={colors.secondary} /> : this.renderContent()}
					<DidiButton title={strings.buttons.cancel} onPress={onCancel} style={{ marginTop: 40 }} />
				</View>
			</View>
		);
	}
}

export default didiConnect(
	SemillasValidationState,
	(state): StoreProps => ({
		validationState: state.validateSemillasDni
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
