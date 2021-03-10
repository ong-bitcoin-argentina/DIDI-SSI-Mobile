import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { didiConnect } from "../../../store/store";
import { RenaperValidationStates, ValidationStates } from "./constants";
import { DidiText } from "../../util/DidiText";
import strings from "../../resources/strings";
import DidiButton from "../../util/DidiButton";
import commonStyles from "../../resources/commonStyles";
import colors from "../../resources/colors";

const {
	Icon,
	Explanation: { Small }
} = DidiText;
const { semillas, dashboard } = strings;
const { validate } = semillas;
const { validateIdentity } = dashboard;
const { modal, button } = commonStyles;

interface StoreProps {
	validationState: ValidationStates | null;
	validateDniFailed: boolean;
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
					onPress={this.props.goToRenaperValidation}
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
				<Small style={styles.modalText}>{validate.semillasProcessing}</Small>
				<Small style={styles.modalText}>{validate.semillasContacting}</Small>
				{this.renderRenaperDescription()}
			</View>
		);
	};

	renderSuccessRequest = () => {
		return (
			<View>
				<Icon fontSize={38} color={colors.greenSemillas} style={{ marginBottom: 10 }}>
					done
				</Icon>
				<Small style={styles.modalText}>{validate.aprroved}</Small>
			</View>
		);
	};

	renderRequestDescription = () => {
		const { goToRenaperValidation, goToSemillasValidation, validateDniFailed } = this.props;
		return (
			<View style={{ paddingTop: 10 }}>
				<Small style={styles.modalText}>{validateDniFailed ? validateIdentity.Failure.title : validate.shouldDo}</Small>
				<View style={{ marginBottom: 15 }}>
					<DidiButton
						onPress={goToRenaperValidation}
						title={validateDniFailed ? validateIdentity.Failure.button : strings.validateIdentity.header}
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
						<DidiButton title={strings.buttons.close} onPress={onCancel} style={{ marginTop: 40 }} />
					</ScrollView>
				</View>
			</View>
		);
	}
}

export default didiConnect(
	SemillasValidationState,
	(state): StoreProps => ({
		validationState: state.validateSemillasDni,
		validateDniFailed: state.validateDni?.state === RenaperValidationStates.failure
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
