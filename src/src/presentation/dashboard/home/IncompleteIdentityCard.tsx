import React from "react";

import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import CredentialCard from "../common/CredentialCard";

import { checkValidateDni } from "../../../services/user/checkValidateDni";
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
	isIdentityComplete: boolean;
	validateDniState: ValidateDniState;
}

interface IncompleteIdentityCardDispatchProps {}

type IncompleteIdentityCardInternalProps = IncompleteIdentityCardProps &
	IncompleteIdentityCardStateProps &
	IncompleteIdentityCardDispatchProps;

class IncompleteIdentityCard extends React.Component<IncompleteIdentityCardInternalProps> {
	private renderButton(title: string, onPress: () => void) {
		return (
			<DidiButton
				style={{ width: 130, height: 36, backgroundColor: colors.secondary }}
				title={title}
				onPress={onPress}
			/>
		);
	}

	private renderContent(): JSX.Element {
		switch (this.props.validateDniState?.state) {
			case undefined:
				return this.renderButton(strings.dashboard.validateIdentity.startButtonTitle, this.props.onStartValidateId);
			case "Failure":
				return this.renderButton(strings.dashboard.validateIdentity.failureButtonTitle, this.props.onValidateIdFailure);
			case "In Progress":
				return (
					<DidiText.Card.Title style={{ color: colors.secondary }}>
						{strings.dashboard.validateIdentity.validating}
					</DidiText.Card.Title>
				);
			case "Success":
				return this.renderButton(strings.dashboard.validateIdentity.successButtonTitle, this.props.onValidateIdSuccess);
		}
	}

	render() {
		return (
			<CredentialCard
				icon=""
				category={strings.dashboard.identity.category}
				title={this.props.personName}
				subTitle={strings.dashboard.identity.subTitle}
				color={colors.secondary}
				hollow={true}
			>
				{this.props.isIdentityComplete ? null : this.renderContent()}
			</CredentialCard>
		);
	}
}

const connected = didiConnect(
	IncompleteIdentityCard,
	(state): IncompleteIdentityCardStateProps => ({
		personName: state.identity.visual.name ?? state.identity.visual.id ?? "",
		isIdentityComplete: state.credentials.find(cred => cred.specialFlag?.type === "PersonalData") !== undefined,
		validateDniState: state.validateDni
	})
);

export { connected as IncompleteIdentityCard };
