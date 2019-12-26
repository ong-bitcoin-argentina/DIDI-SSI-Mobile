import React from "react";

import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import CredentialCard from "../common/CredentialCard";

import { ValidateDniState } from "../../../store/reducers/validateDniProgressReducer";
import { didiConnect } from "../../../store/store";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

export interface IncompleteIdentityCardProps {
	onStartValidateId: () => void;
	onValidateIdSuccess: () => void;
	onValidateIdFailure: (message?: string) => void;
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
		return (
			<DidiButton
				style={{ width: 130, height: 36, backgroundColor: colors.secondary }}
				title={title}
				onPress={onPress}
			/>
		);
	}

	private renderContent(): JSX.Element {
		const state = this.props.validateDniState;
		switch (state?.state) {
			case undefined:
				return this.renderButton(strings.dashboard.validateIdentity.startButtonTitle, this.props.onStartValidateId);
			case "Failure":
				return this.renderButton(strings.dashboard.validateIdentity.failureButtonTitle, () => {
					this.props.onValidateIdFailure(state.message);
				});
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
		if (this.props.isIdentityCredentialPresent && this.props.validateDniState === null) {
			return null;
		} else {
			return (
				<CredentialCard
					icon=""
					category={strings.dashboard.identity.category}
					title={this.props.personName}
					subTitle={strings.dashboard.identity.subTitle}
					color={colors.secondary}
					hollow={true}
				>
					{this.renderContent()}
				</CredentialCard>
			);
		}
	}
}

const connected = didiConnect(
	IncompleteIdentityCard,
	(state): IncompleteIdentityCardStateProps => ({
		personName: state.identity.visual.name ?? state.identity.visual.id ?? "",
		isIdentityCredentialPresent:
			state.credentials.find(cred => cred.specialFlag?.type === "PersonalData") !== undefined,
		validateDniState: state.validateDni
	})
);

export { connected as IncompleteIdentityCard };
