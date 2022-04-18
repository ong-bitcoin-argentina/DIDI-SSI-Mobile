import React from "react";
import { StyleSheet } from "react-native";

import DidiButton from "../../util/DidiButton";
import { DidiText } from "../../util/DidiText";
import DidiCardBody from "../common/DidiCardBody";
import colors from "../../resources/colors";
import strings from "../../resources/strings";

export interface IdentityVerificationCardProps {
	onStartValidateId: () => void;
	style: any;
	credentials: any
}

export interface IdentityVerificationCardState {
	cardVisibleState: boolean
}

export class IdentityVerificationCard extends React.Component<IdentityVerificationCardProps,IdentityVerificationCardState> {

	constructor(props: IdentityVerificationCardProps) {
        super(props);
        this.state = {
            cardVisibleState: false,
        }
    }

	componentDidMount(){
			const findVerified = this.props.credentials.find(function(element: any) {
				return element.data.Credencial === strings.specialCredentials.PersonalData.title;
			});
			if (findVerified) {
				this.setState({
					cardVisibleState: true,
				});
			}
	}

	render() {
		const {style } = this.props;
			return (
				<>
				{this.state.cardVisibleState?
				<DidiCardBody icon="" color={colors.error} hollow={true} style={{ minHeight: undefined, ...style }}>
					<DidiText.Card.Title style={styles.titleColor}>{strings.dashboard.validateIdentity.Start.title}</DidiText.Card.Title>
                    <DidiButton style={styles.button} title={strings.dashboard.validateIdentity.Start.button} onPress={this.props.onStartValidateId} />
				</DidiCardBody>: null}
				</>
			);
	}
}



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
