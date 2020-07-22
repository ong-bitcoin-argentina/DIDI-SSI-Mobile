import React, { Fragment } from "react";
import { StyleSheet } from "react-native";

import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiCardBody from "../common/DidiCardBody";

import { ValidateDniState } from "../../../store/reducers/validateDniProgressReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

export interface IncompleteIdentityCardProps {
	onStartValidateId: () => void;
	onValidateIdSuccess: () => void;
	onValidateIdFailure: () => void;
}

interface IncompleteIdentityCardStateProps {
	personName: string;
	isIdentityCredentialPresent: boolean;
	validateDniState: ValidateDniState;
}

interface IncompleteIdentityCardDispatchProps {}

type IncompleteIdentityCardInternalProps = IncompleteIdentityCardProps &
	IncompleteIdentityCardStateProps &
	IncompleteIdentityCardDispatchProps;

class IncompleteIdentityCard extends React.Component<IncompleteIdentityCardInternalProps> {
	private renderButton(title: string, onPress: () => void) {
		return <DidiButton style={styles.button} title={title} onPress={onPress} />;
	}

	private renderMessages(): JSX.Element {
		const state = this.props.validateDniState;
		const texts = strings.dashboard.validateIdentity[state?.state ?? "Start"];
		return (
			<Fragment>
				{texts && <DidiText.Card.Title style={styles.titleColor}>{texts.title}</DidiText.Card.Title>}
				{texts && texts.subtitle && (
					<DidiText.Card.Subtitle style={styles.subtitleColor}>{texts.subtitle}</DidiText.Card.Subtitle>
				)}
			</Fragment>
		);
	}

	private renderAction(): JSX.Element | undefined {
		const state = this.props.validateDniState;
		switch (state?.state) {
			case undefined:
				return this.renderButton(strings.dashboard.validateIdentity.Start.button, this.props.onStartValidateId);
			case "Failure":
				return this.renderButton(strings.dashboard.validateIdentity.Failure.button, () => {
					this.props.onValidateIdFailure();
					this.props.onStartValidateId();
				});
			case "In Progress":
				return undefined;
			case "Success":
				return this.renderButton(strings.dashboard.validateIdentity.Success.button, this.props.onValidateIdSuccess);
			case "Finished":
				return undefined;
		}
	}

	render() {
		const { isIdentityCredentialPresent, validateDniState } = this.props;
		// Only with "Finished" check it works, but some users still have the old configuration and this must be considered
		if ((isIdentityCredentialPresent && validateDniState === null) || validateDniState?.state === "Finished") {
			return null;
		} else {
			return (
				<DidiCardBody icon="" color={colors.error} hollow={true} style={{ minHeight: undefined }}>
					{this.renderMessages()}
					{this.renderAction()}
				</DidiCardBody>
			);
		}
	}
}

const connected = didiConnect(
	IncompleteIdentityCard,
	(state): IncompleteIdentityCardStateProps => ({
		personName: state.validatedIdentity.name ?? state.validatedIdentity.id ?? "",
		isIdentityCredentialPresent:
			state.credentials.find(cred => cred.specialFlag?.type === "PersonalData") !== undefined,
		validateDniState: state.validateDni
	})
);

export { connected as IncompleteIdentityCard };

const styles = StyleSheet.create({
	button: {
		width: 130,
		height: 36,
		backgroundColor: colors.error,
		marginTop: 16
	},
	titleColor: {
		color: colors.error
	},
	subtitleColor: {
		color: colors.error,
		marginTop: 8
	}
});
