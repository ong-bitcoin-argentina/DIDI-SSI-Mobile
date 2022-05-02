import React from "react";
import { StyleSheet } from "react-native";

import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiCardBody from "../common/DidiCardBody";
import colors from "../../resources/colors";
import strings from "../../resources/strings";
import { didiConnect } from '../../../store/store';
import { CredentialDocument } from '@proyecto-didi/app-sdk';

export interface IdentityVerificationCardProps {
	onStartValidateId: () => void;
	style: any;
}

export interface IdentityVerificationCardState {
	cardVisibleState: boolean
}
interface IdentityStoreCardProps {
	credentials: CredentialDocument[];
	validateDni: string | undefined;
}
type IdentityCardProps = IdentityStoreCardProps & IdentityVerificationCardProps;
class IdentityVerificationCard extends React.Component<IdentityCardProps,IdentityVerificationCardState> {

	constructor(props: IdentityCardProps) {
        super(props);
        this.state = {
            cardVisibleState: false,
        }
    }

	componentDidMount(){
			const findVerified = this.props.credentials.find(function(element: any) {
				return element.data.Credencial === strings.specialCredentials.PersonalData.title;
			});
			if (!findVerified) {
				this.setState({
					cardVisibleState: true,
				});
			}
	}

	render() {
		const {style } = this.props;
			return (
				<>
				{this.state.cardVisibleState && this.props.validateDni !== 'Successful' ?
				<DidiCardBody icon="" color={colors.error} hollow={true} style={{ minHeight: undefined, ...style }}>
					<DidiText.Card.Title style={styles.titleColor}>{strings.dashboard.validateIdentity.Start.title}</DidiText.Card.Title>
                    <DidiButton style={styles.button} title={strings.dashboard.validateIdentity.Start.button} onPress={this.props.onStartValidateId} />
				</DidiCardBody>: null}
				</>
			);
	}
}

const connected = didiConnect(
	IdentityVerificationCard,
	(state): IdentityStoreCardProps => ({
		credentials: state.credentials,
		validateDni: state.validateDni?.state
	})
);

export { connected as IdentityVerificationCard };

const styles = StyleSheet.create({
	button: {
		alignContent: "center",
		alignSelf: "flex-start",
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
